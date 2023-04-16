import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import ShiftType from './ShiftType'
import Member from './Member'
import Shift from './Shift'

export default class Schedule extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => ShiftType)
  public shiftTypes: HasMany<typeof ShiftType>

  @hasMany(() => Shift)
  public shifts: HasMany<typeof Shift>

  @manyToMany(() => Member, {
    pivotTable: 'schedule_members',
  })
  public members: ManyToMany<typeof Member>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
