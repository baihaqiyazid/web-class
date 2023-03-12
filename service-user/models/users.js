module.exports = (sequalize, DataTypes) => {
    const User = sequalize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
          }, 
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          profession: {
            type: DataTypes.STRING,
            allowNull: true
          },
          avatar: {
            type: DataTypes.STRING,
            allowNull: true
          },
          role: {
            type: DataTypes.ENUM,
            values: ["admin", "student"],
            allowNull: false,
            defaultValue: 'student'
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false
          },
          createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
          },
          updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            allowNull: false
          },
    }, {
        tableName: 'users',
        timesTamp: true
    })

    return User
}