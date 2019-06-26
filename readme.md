User Guide.


Pre installation.

You need to install these development tools in your computer for environment.

Firstly you need to install the nvm(node version manager).

 - sudo apt-get update
 - curl https://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh | bash
 - source /root/.bashrc

Then the nvm is installed in your computer.

Secondly you need to install the node.js and npm.

 - sudo nvm install 6.9.0

You can check node.js and npm with this command.
 - sudo node -v
 - sudo npm -v

Finally, you need to install the postgresql database.

 - sudo apt-get update
 - sudo apt-get install postgresql postgresql-contrib

I'd be better to use the user 'postgres'.
You need to change the user password of 'postgres'.

 - sudo psql -U postgres
 - \password

Then you can put in the new password for user 'postgres'.
Here, you have to set up new password 'postgres'.

That's all for pre installation.



Environment

You need to clone the project from git.

 - sudo git clone https://github.com/assassin94mean/orderSYS-Angular2-Postgresql.git

After clone, you need to install node module in your project and server.

 - sudo cd project_location
 - sudo npm install
 - sudo cd project_location/server
 - sudo npm install

After this you can see node_module folder in your project.

Last but not least, you need database for your project.

 - sudo su - postgres
 - psql
 - CREATE DATABASE damian;
 - \c damian;
 - \dt;
 - \q;
 - psql damian < db-damian.sql

This sql dump file 'db-damian.sql' have to be in var/lib/postgresql.

Then all tables are restored in your database 'damian'.

That's all for your project.

