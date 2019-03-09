var Travis = require('travis-ci');

var repo = 'https://github.com/MRozza/login-unit.git';

var travis = new Travis({
  version: '2.0.0'
});

travis.authenticate(
  {
    // available through Travis CI Account - settings
    github_token: 'Dukl6RIkyDQUMxG-nxSASg'
  },
  function(err, res) {
    if (err) {
      return console.error(err);
    }

    travis
      .repos(repo.split('/')[0], repo.split('/')[1])
      .builds.get(function(err, res) {
        if (err) {
          return console.error(err);
        }

        travis.requests.post(
          {
            build_id: res.builds[0].id
          },
          function(err, res) {
            if (err) {
              return console.error(err);
            }
            console.log(res.flash[0].notice);
          }
        );
      });
  }
);
