import {Sequelize} from 'sequelize';

const db=new Sequelize('curso-node','root','12345678',{
    host:'localhost',
    dialect:'mysql',
    //logging:false
});

export default db;