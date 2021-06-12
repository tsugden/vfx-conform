set -e

mongo <<EOF
use admin
db.createUser({
  user: '$MONGO_USER_USERNAME',
  pwd: '$MONGO_USER_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_DATABASE_DEV'
  }, {
    role: 'readWrite',
    db: '$MONGO_DATABASE_TEST'
  }]
})
EOF