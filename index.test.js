const { READCOMMITTED } = require('sequelize/lib/table-hints');
const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

let resteraunts;
let menus;
describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });

        resteraunts = await Restaurant.bulkCreate(seedRestaurant);
        menus = await Menu.bulkCreate(seedMenu);
    });

    test('can create a Restaurant', async () => {
        // TODO - write test
        expect(resteraunts[0].name).toBe("AppleBees");
    });

    test('can create a Menu', async () => {
        // TODO - write test
        expect(menus[0].title).toEqual('Breakfast')
    });

    test('can find Restaurants', async () => {
        const foundRestaurant = await Restaurant.findByPk(1);
        expect(foundRestaurant.name).toEqual('AppleBees');
    });

    test('can find Menus', async () => {
        const foundMenu = await Menu.findByPk(1);
        expect(foundMenu.title).toEqual('Breakfast');
    });

    test('can delete Restaurants', async () => {
        const deletedRestaurant = await resteraunts[0].destroy();
        expect(deletedRestaurant.name).toEqual('AppleBees')
    });
})