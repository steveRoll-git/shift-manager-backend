import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Member from './Member'
import ShiftType from './ShiftType'

export default class Shift extends BaseModel {
  @column({ isPrimary: true })
  public scheduleId: number

  @column({ isPrimary: true })
  public shiftTypeId: number

  @hasOne(() => ShiftType)
  public shiftType: HasOne<typeof ShiftType>

  @column({ isPrimary: true })
  public memberId: number

  @hasOne(() => Member)
  public member: HasOne<typeof Member>

  @column.dateTime({
    isPrimary: true,
    serialize: (value: DateTime) => value.toISODate(),
  })
  public date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
