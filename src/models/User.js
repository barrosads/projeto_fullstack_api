import Sequelize, { Model } from "sequelize";
import bcryptjs from 'bcryptjs';

export default class User extends Model{
    static init(sequelize){
       super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'Campo nome não pode ser vazio',
                    },
                },
            } ,
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: 'Email já existe',
                },
                validate: {
                    isEmail: {
                        msg: 'E-mail invalido!',
                    },
                },
            } ,
            password_hash: {
                type: Sequelize.STRING,
                defaultValue: '',
                
            } , 
            password: {
                type: Sequelize.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [6, 50],
                        msg: 'A Senha preisar ter mais de 6 caracter',
                    },
                },
            } ,
       }, {
        sequelize,
        tableName: 'tb_users',
       }); 
       this.addHook('beforeSave', async (user) => {
        user.password_hash = await bcryptjs.hash(user.password, 8);

       });
       return this;
    }
}