set -e
run_cmd="npm start"
db_migrate="/opt/mssql-tools/bin/sqlcmd -S db -U sa -P YourStrong@Passw0rd -i ./setup.sql"

until $db_migrate; do
>&2 echo "SQL Server is starting up. Running initial db configuration"
sleep 1
done

>&2 echo "SQL Server is up - starting app"
exec $run_cmd
