const { READCOMMITTED } = require('sequelize/lib/table-hints');
const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
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

    test("can create Item", async () => {
        const item = await Item.create({
            name: "Test Item",
            image: "Test Image",
            price: 1000,
            vegetarian: false,

        })

        expect(item.name).toBe("Test Item");
    });

    test("can find Item", async () => {
        const foundItem = await Item.findByPk(1);

        expect(foundItem.name).toBe("Test Item")
    });

    test("can delete Item", async () => {
        const foundItem = await Item.findByPk(1);
        const deletedItem = await foundItem.destroy();

        expect(deletedItem.name).toBe("Test Item");
    })

    test("Can eager Load", async () => {

        const menu = await Menu.create({
            title: "Test Menu",

        })

        const item = await Item.create({
            name: "Test Item",
            image: "Test Image",
            price: 1000,
            vegetarian: false,

        })

        const itemTwo = await Item.create({
            name: "Test Item 2",
            image: "Test Image",
            price: 1000,
            vegetarian: false,

        })

        const itemThree = await Item.create({
            name: "Test Item 3",
            image: "Test Image",
            price: 1000,
            vegetarian: false,

        })

        await menu.addItem(item);
        await menu.addItem(itemTwo);
        await menu.addItem(itemThree);

        const menuItems = await Menu.findOne({
            where: {
                title: "Test Menu",

            },
            include: Item,

        })

        expect(menuItems.Items.length).toBe(3);

    })
})