import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Member from './Member'
import ShiftType from './ShiftType'

export default class Shift extends BaseModel {
  @column({ isPrimary: true })
  @hasOne(() => ShiftType)
  public shiftType: HasOne<typeof ShiftType>

  @column({ isPrimary: true })
  @hasOne(() => Member)
  public member: HasOne<typeof Member>

  @column()
  public date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
