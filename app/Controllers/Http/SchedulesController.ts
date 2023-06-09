import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Schedule from 'App/Models/Schedule'

export default class SchedulesController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
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
    await schedule.save()
    await schedule.related('shiftTypes').createMany(payload.shiftTypes)

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

  public async show({ params, response }: HttpContextContract) {
    const id = params.id as number

    const schedule = await Schedule.find(id)
    if (schedule) {
      await schedule.load('shiftTypes')
      await schedule.load('members')
      return schedule
    }

    response.status(404)
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
