import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Schedule from 'App/Models/Schedule'
import Shift from 'App/Models/Shift'

const shiftArraySchema = schema.array().members(
  schema.object().members({
    shiftTypeId: schema.number(),
    memberId: schema.number(),
    date: schema.date(),
  })
)

export default class ShiftsController {
  public async index({ request, response, params }: HttpContextContract) {
    const shiftSearchSchema = schema.create({
      minDate: schema.date.optional(),
      maxDate: schema.date.optional(),
      dates: schema.array.optional().members(schema.date()),
    })

    const payload = await request.validate({ schema: shiftSearchSchema })

    const existsQuery = await Database.rawQuery('select exists(select 1 from ?? where id=?)', [
      Schedule.table,
      params.id,
    ])
    if (!existsQuery.rows[0].exists) {
      return response.status(404)
    }

    const shifts = await Shift.query()
      .where('schedule_id', params.id)
      .if(payload.dates, (query) => {
        query.whereIn(
          'date',
          payload.dates!.map((d) => d.toISODate())
        )
      })
      .if(payload.minDate, (query) => {
        query.where('date', '>=', payload.minDate!.toSQLDate())
      })
      .if(payload.maxDate, (query) => {
        query.where('date', '<=', payload.maxDate!.toSQLDate())
      })

    return shifts.map((shift) => shift.serialize())
  }

  public async create({}: HttpContextContract) {}

  public async edit({ request, params }: HttpContextContract) {
    const editShiftsSchema = schema.create({
      addShifts: shiftArraySchema,
      removeShifts: shiftArraySchema,
    })

    const payload = await request.validate({ schema: editShiftsSchema })

    const addShifts = payload.addShifts.map((o) => ({ ...o, scheduleId: params.id as number }))
    await Shift.createMany(addShifts)

    const removeShifts = payload.removeShifts.map((o) => ({
      ...o,
      date: o.date.toSQLDate(),
      scheduleId: params.id as number,
    }))
    for (const shift of removeShifts) {
      await Shift.query()
        .where('scheduleId', shift.scheduleId)
        .where('shiftTypeId', shift.shiftTypeId)
        .where('memberId', shift.memberId)
        .where('date', shift.date)
        .delete()
    }
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
