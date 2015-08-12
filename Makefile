run: 

start_db:
	mongod --config /usr/local/etc/mongod.conf &

dump_db:
	mongoexport --db pairgramming --collection users --out pairgramming_users.json

load_db:
	echo "use pairgramming\ndb.users.remove({})\n" | mongo
	mongoimport --db pairgramming --collection users --file pairgramming_users.json
