// import express from "express";
// import cors from "cors";


// require('dotenv').config();
// // const express = require('express');

// const { PrismaClient } = require('./prisma/generated/prisma');
// const { PrismaPg } = require('@prisma/adapter-pg');
// const { Pool } = require('pg');
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./prisma/generated/prisma/index.js";

dotenv.config();

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });



//json
app.use(express.json());

//cors
app.use(cors({
  origin: "http://localhost:3000",    // ← FRONTEND port (Next.js)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//test api
app.get('/test', (req, res) => {
  try {
    console.log("Working..........")
    res.status(200).json({ message: 'API is working' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all users
app.get('/users', async (req, res) => {
  try {
    console.log("Working..........")
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//debug
app.get('/debug/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});


//get user by id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await prisma.User.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create user
app.post('/users', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update user
app.put('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete user
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));