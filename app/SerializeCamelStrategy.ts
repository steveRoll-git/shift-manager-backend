import { type BaseModel, SnakeCaseNamingStrategy } from '@ioc:Adonis/Lucid/Orm'

export default class SerializeCamelStrategy extends SnakeCaseNamingStrategy {
  public serializedName(_model: typeof BaseModel, propertyName: string) {
    return propertyName
  }
}
