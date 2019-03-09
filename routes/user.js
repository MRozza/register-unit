exports.register = function(req, res) {
  message = '';
  if (req.method == 'POST') {
    var post = req.body;
    var userName = post.user_name;
    var password = post.password;
    var name = post.name;
    console.log(userName);
    console.log(password);
    var sql =
      "INSERT INTO 'users'('name','user_name', 'password') VALUES ('" +
      name +
      "','" +
      userName +
      "','" +
      password +
      "')";

    db.query(sql, function(err, result) {
      message = 'Succesfully! Your account has been created.';

      sql =
        "SELECT id, name, user_name FROM 'users' WHERE 'user_name'='" +
        userName +
        "' and password = '" +
        password +
        "'";
      db.query(sql, function(err, results) {
        console.log(results);

        if (results && results.length) {
          res.redirect('http://localhost:8091/login');
        } else {
          message = 'Invalid Username or Password!';
          res.render('index.ejs', { message: message });
        }
      });
    });
  } else {
    res.render('signup');
  }
};
