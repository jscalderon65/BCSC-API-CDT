import { credentials } from '../constants/credentials';
import mongoose from 'mongoose';
import { mongoDb } from '../constants/mongoDb';

const { FIXED_RATE_CERTIFICATES } = mongoDb.SCHEMA_NAMES;
const MONGO_URI = credentials.MONGO_URI;

//CERTIFICADOS DE DEPÓSITO A TÉRMINO - TASA FIJA Vigentes a partir del 6 de diciembre de 2023
async function insertData() {
  try {
    await mongoose.connect(MONGO_URI);
    const db = mongoose.connection;
    const FixedRateCertificateModel = db.collection(FIXED_RATE_CERTIFICATES);

    await FixedRateCertificateModel.deleteMany();

    console.log('Deleting data...');

    const FixedRateCertificatesToInsert = [
      {
        from: 500000,
        to: 9999999,
        rates: [
          {
            minDaysLimit: 60,
            maxDaysLimit: 89,
            rate: 0.7,
          },
          {
            minDaysLimit: 90,
            maxDaysLimit: 179,
            rate: 9.35,
          },
          {
            minDaysLimit: 180,
            maxDaysLimit: 359,
            rate: 9.5,
          },
          {
            minDaysLimit: 360,
            maxDaysLimit: 539,
            rate: 8.75,
          },
          {
            minDaysLimit: 540,
            maxDaysLimit: 500000000,
            rate: 8.8,
          },
        ],
      },
      {
        from: 10000000,
        to: 39999999,
        rates: [
          {
            minDaysLimit: 60,
            maxDaysLimit: 89,
            rate: 0.7,
          },
          {
            minDaysLimit: 90,
            maxDaysLimit: 179,
            rate: 9.5,
          },
          {
            minDaysLimit: 180,
            maxDaysLimit: 359,
            rate: 9.6,
          },
          {
            minDaysLimit: 360,
            maxDaysLimit: 539,
            rate: 8.85,
          },
          {
            minDaysLimit: 540,
            maxDaysLimit: 500000000,
            rate: 8.9,
          },
        ],
      },
      {
        from: 40000000,
        to: 99999999,
        rates: [
          {
            minDaysLimit: 60,
            maxDaysLimit: 89,
            rate: 0.7,
          },
          {
            minDaysLimit: 90,
            maxDaysLimit: 179,
            rate: 9.5,
          },
          {
            minDaysLimit: 180,
            maxDaysLimit: 359,
            rate: 9.6,
          },
          {
            minDaysLimit: 360,
            maxDaysLimit: 539,
            rate: 8.85,
          },
          {
            minDaysLimit: 540,
            maxDaysLimit: 500000000,
            rate: 8.9,
          },
        ],
      },
      {
        from: 100000000,
        to: 199999999,
        rates: [
          {
            minDaysLimit: 60,
            maxDaysLimit: 89,
            rate: 0.7,
          },
          {
            minDaysLimit: 90,
            maxDaysLimit: 179,
            rate: 9.7,
          },
          {
            minDaysLimit: 180,
            maxDaysLimit: 359,
            rate: 10.0,
          },
          {
            minDaysLimit: 360,
            maxDaysLimit: 539,
            rate: 9.3,
          },
          {
            minDaysLimit: 540,
            maxDaysLimit: 500000000,
            rate: 9.35,
          },
        ],
      },
      {
        from: 200000000,
        to: 499999999,
        rates: [
          {
            minDaysLimit: 60,
            maxDaysLimit: 89,
            rate: 0.7,
          },
          {
            minDaysLimit: 90,
            maxDaysLimit: 179,
            rate: 9.7,
          },
          {
            minDaysLimit: 180,
            maxDaysLimit: 359,
            rate: 10.0,
          },
          {
            minDaysLimit: 360,
            maxDaysLimit: 539,
            rate: 9.3,
          },
          {
            minDaysLimit: 540,
            maxDaysLimit: 500000000,
            rate: 9.35,
          },
        ],
      },
      {
        from: 500000000,
        to: 999999999,
        rates: [
          {
            minDaysLimit: 60,
            maxDaysLimit: 89,
            rate: 0.7,
          },
          {
            minDaysLimit: 90,
            maxDaysLimit: 179,
            rate: 9.75,
          },
          {
            minDaysLimit: 180,
            maxDaysLimit: 359,
            rate: 10.05,
          },
          {
            minDaysLimit: 360,
            maxDaysLimit: 539,
            rate: 9.4,
          },
          {
            minDaysLimit: 540,
            maxDaysLimit: 500000000,
            rate: 9.45,
          },
        ],
      },
    ];

    await FixedRateCertificateModel.insertMany(FixedRateCertificatesToInsert);

    console.log('FixedRateCertificates data inserted successfully');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting FixedRateCertificates data:', error);
    mongoose.disconnect();
  }
}

insertData();
