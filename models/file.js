module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define(
      "File",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        size: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        path: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "files",
        timestamps: false,
      }
    );
  
    File.associate = (models) => {
      File.belongsTo(models.User, { foreignKey: "user_id" });
    };
  
    return File;
  };
  