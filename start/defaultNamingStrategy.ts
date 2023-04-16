import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import SerializeCamelStrategy from 'App/SerializeCamelStrategy'

BaseModel.namingStrategy = new SerializeCamelStrategy()
