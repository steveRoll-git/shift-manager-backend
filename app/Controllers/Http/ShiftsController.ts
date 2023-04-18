import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Schedule from 'App/Models/Schedule'
import Shift from 'App/Models/Shift'

export default class ShiftsController {
  public async index({ request, response, params }: HttpContextContract) {
    const shiftSearchSchema = schema.create({
      minDate: schema.date.optional(),
      maxDate: schema.date.optional(),
    })

    const payload = await request.validate({ schema: shiftSearchSchema })

    const existsQuery = await Database.rawQuery('select exists(select 1 from ?? where id=?)', [
      Schedule.table,
      params.id,
    ])
    if (!existsQuery.rows[0].exists) {
      return response.status(404)
    }

    let query = Shift.query().where('schedule_id', params.id)

    if (payload.minDate) {
      query = query.where('date', '>=', payload.minDate.toSQLDate())
    }
    if (payload.maxDate) {
      query = query.where('date', '<=', payload.maxDate.toSQLDate())
    }

    const shifts = await query

    return shifts.map((shift) => shift.serialize())
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
