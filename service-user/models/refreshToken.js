module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define('RefreshToken', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
          },
          token: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          createdAt: {
            type: DataTypes.DATE,
            field: "created_at",
            allowNull: false
          },
          updatedAt: {
            type: DataTypes.DATE,
            field: "updated_at",
            allowNull: false
          },
    }, {
        tableName: 'refresh_tokens',
        timesTamps: true
    })

    return RefreshToken;
}