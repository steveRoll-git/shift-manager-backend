import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'schedule_members'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('member_id').unsigned().references('members.id')
      table.integer('schedule_id').unsigned().references('schedules.id')
      table.primary(['member_id', 'schedule_id'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
