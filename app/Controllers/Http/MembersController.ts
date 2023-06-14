import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Schedule from 'App/Models/Schedule'

export default class MembersController {
  public async index({}: HttpContextContract) {}

  public async store({ request, params, response }: HttpContextContract) {
    const createMemberSchema = schema.create({
      name: schema.string(),
    })

    const payload = await request.validate({ schema: createMemberSchema })

    const schedule = await Schedule.findOrFail(params.id)

    const member = await schedule.related('members').create({
      name: payload.name,
    })

    response.status(201)

    return {
      memberId: member.id,
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
