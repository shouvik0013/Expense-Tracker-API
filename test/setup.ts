import { join } from 'path';
import { rm } from 'node:fs/promises';
import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

let dataSource;

// global.beforeEach(async () => {
// 	try {
// 		await rm(join(__dirname, '..', configService.get('DB_NAME')));
// 		console.log('^^^^^^^^SUCCESS^^^^^^^^^');
// 	} catch (error) {
// 		console.log(error);
// 	}
// });
// global.beforeAll(async () => {
// 	try {
// 		await rm(join(__dirname, '..', configService.get('DB_NAME')));
// 		console.log('^^^^^^^^SUCCESS^^^^^^^^^');
// 	} catch (error) {
// 		console.log(error);
// 	}
// })

// global.beforeEach(async () => {
// 	console.log('*************************', configService.get('DB_NAME'));

// 	dataSource = await new DataSource({
// 		type: 'sqlite',
// 		database: configService.get('DB_NAME'),
// 		synchronize: true,
// 	}).initialize();

// 	try {
// 		// await dataSource.dropDatabase();
// 		await dataSource.destroy();

// 	} catch (error) {
// 		console.log('&&&&&&&&', error);
// 	}
// });

// global.beforeEach(async () => {
// 	try {
// 		await rm(join(__dirname, '..', configService.get('DB_NAME')));
// 		console.log('******** SUCCESS ********');
// 	} catch (error) {
// 		console.log('******** ERROR ********', error.message);
// 	}
// });


// async function init() {
// 	dataSource = await new DataSource({
// 		type: 'sqlite',
// 		entities: ['../**/*.entity.ts'],
// 		database: configService.get('DB_NAME'),
// 	}).initialize();
// }

// init();



// global.afterEach(async () => {
// 	dataSource = await new DataSource({
// 		type: 'sqlite',
// 		// entities: ['../**/*.entity.ts'],
// 		database: configService.get('DB_NAME'),
// 	}).initialize();

// 	// Fetch all the entities
// 	// const entities = dataSource.entityMetadatas;
// 	// // console.log('************* ENTITIES ***************', entities);
// 	// for (const entity of entities) {
// 	// 	console.log(`********* ENTITY NAME: ${entity.name}`);
// 	// 	// const repository = dataSource.getRepository(entity.name); // Get repository
// 	// 	// await repository.clear(); // Clear each entity table's content
// 	// }

// 	try {
	
// 		await dataSource.destroy();
// 		console.log('*********** DISCONNECTED ***********');
// 	} catch (error) {
// 		console.log('****** ERROR DISCONNECTION ******', error.message);
// 	}
// });

// global.beforeEach(async () => {
// 	dataSource = await new DataSource({
// 		type: 'sqlite',
// 		// entities: ['../**/*.entity.ts'],
// 		database: configService.get('DB_NAME'),
// 		synchronize: true,
// 	});
// });

global.afterAll(async () => {
	try {
		dataSource = await new DataSource({
			type: 'sqlite',
			database: configService.get('DB_NAME'),
		}).initialize();
		await dataSource.dropDatabase();
		await dataSource.destroy();
		console.log('******** SUCCESS CLEANUP ********');
	} catch (error) {
		console.log('********* DELETION ERROR ************', error);
	}
});
