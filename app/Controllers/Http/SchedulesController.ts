import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Schedule from 'App/Models/Schedule'

export default class SchedulesController {
  public async index({}: HttpContextContract) {}

  public async create({ request, response }: HttpContextContract) {
    const newScheduleSchema = schema.create({
      name: schema.string(),
      shiftTypes: schema.array().members(
        schema.object().members({
          name: schema.string([rules.maxLength(20)]),
        })
      ),
    })

    const payload = await request.validate({ schema: newScheduleSchema })

    const schedule = new Schedule()
    schedule.name = payload.name
    // TODO create all shift types
    await schedule.save()

    if (schedule.$isPersisted) {
      response.status(201)
      return {
        scheduleId: schedule.id,
      }
    } else {
      response.status(500)
      return
    }
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
