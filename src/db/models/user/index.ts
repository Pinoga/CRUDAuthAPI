import {
    Sequelize,
    Model,
    DataTypes,
    UUIDV4,
    ModelAttributes,
    InitOptions,
} from 'sequelize';

export default class User extends Model {
    public id!: string;
    public firstName!: string;
    public lastName!: string | null;
    public email!: string;
    public readonly password!: string;
    public readonly createAt!: Date;
    public readonly updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        return this.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                lastName: {
                    type: DataTypes.STRING,
                    defaultValue: '',
                    allowNull: true,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                freezeTableName: true,
                sequelize,
            }
        );
    }
}
