//(sequelize) est le paramètre de connexion avec la méthode define
//(DataTypes) définit le type de données de chaque pptés

const validTypes = ['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fée']
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty:{msg:"Le nom ne peut pas être vide"},
          notNull:{msg:"Le nom est recquis"}
        },
        unique:{
          msg: "Le nom est déjà pris"
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg: "Les points de vie doivent être des nombres entiers"},
          notNull:{msg:"Les points de vie doivent être saisis."},
          min:{
            args:[0],
            msg:"Les hp doivent être supérieur à 0 "
          },
          max:{
            args:[999],
            msg:"Les hp doivent être inférieurs à 999 "
          }    
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt:{msg: "Utilisez uniquement des nombres pour les points de dégâts"},
          notNull:{msg:"Les cp sont recquis"},
          min:{
            args:[0],
            msg:"Les cp doivent être supérieur à 0"
          },
          max:{
            args:[99],
            msg:"Les cp ne peuvent pas être supérieurs à 99"
          }

        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isUrl:{msg:"Utiliser une URL valide pour l\'image"},
          notNull:{msg:"Une image est recquise"}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue('types').split(',')
        },
        set(types){
            this.setDataValue('types',types.join())//Pour ajouter ppté types à BDD, Côté API les types sont un tableau de cc alors que la ppté types est une cc côté BDD
        },
        validate: {
          //validateur personnalisé (value) corrrespond à la valeur des types en BDD cc 
          areTypesValid(value){
            if(!value){
              throw new Error("Un pokemon doit avoir au moins un type")
            }
            if(value.split(',').length > 3 ){
              throw new Error("Un pokemon ne peut pas avoir plus de 3 types")
            }
            value.split(',').forEach(type =>{
              if(!validTypes.includes(type)){
                throw new Error(`Le type doit être parmis cette liste: ${validTypes} `)
              }
            })
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }