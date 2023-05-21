import mysql from 'mysql2/promise'
export class MySQLUtils {
  constructor(table) {
    this.table = table
    this.select = 'SELECT * FROM ' + this.table
    this.filter = ''
    this.orderBy = ''
    this.count = false
    this.groupBy = ''
    this.pagination = {
      isPagination: false,
      page: 1,
      limit: 10
    }
  }

  $filter(filter) {
    this.filter =
      ' WHERE ' +
      this.sanitize(
        filter
          .replace(/eq/gi, '=')
          .replace(/and/gi, 'AND')
          .replace(/bt/gi, 'BETWEEN')
          .replace(/or/gi, 'OR')
          .replace(/df/gi, '!=')
      )
  }

  $select(select) {
    this.select = 'SELECT ' + this.sanitize(select) + ' FROM ' + this.table
  }

  $count(count) {
    this.count = true
    this.select = 'SELECT COUNT(*) as Total ' + 'FROM ' + this.table
  }

  $orderBy(orderBy) {
    this.orderBy =
      ' ORDER BY ' +
      this.sanitize(orderBy.replace(/as/gi, 'ASC').replace(/ds/gi, 'DESC'))
  }

  $groupBy(groupBy) {
    this.groupBy = 'GROUP BY ' + this.sanitize(groupBy)
  }

  $apply(apply) {
    apply.split(' ')
  }

  $pagination(pagination) {
    const Pagination = pagination.split(',')
    this.pagination = {
      isPagination: true,
      page: Number(Pagination[0]),
      limit: Number(Pagination[1])
    }
  }

  $table(table) {}
  sanitize(value) {
    if (typeof value !== 'number')
      return value
        .replace(/'/g, encodeURI("'"))
        .replace(
          /(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})\b)|(--[\s])/gi,
          ''
        )
    return value
  }

  generateUpdateFields(data) {
    let FieldstoUpdate = ''
    const updateValues = []
    const fieldNames = Object.keys(data)

    fieldNames.forEach((fieldName, index) => {
      FieldstoUpdate += `${fieldName} = ?`
      updateValues.push(this.sanitize(data[fieldName]))
      if (index !== fieldNames.length - 1) {
        FieldstoUpdate += ', '
      }
    })

    return { FieldstoUpdate, updateValues }
  }

  execute(params) {
    for (const key in params) {
      this[key](params[key])
    }

    let sql = `${this.select} ${this.filter}${this.groupBy}${this.orderBy}`
    if (this.count) {
      this.$count(params.$count)
      sql = `${this.select} ${this.filter}${this.orderBy}`
    } else {
      if (this.pagination.isPagination) {
        sql += ' LIMIT ?,? ;'
        return (sql = mysql.format(sql, [
          this.pagination.limit * this.pagination.page - this.pagination.limit,
          this.pagination.limit
        ]))
      } else {
        sql += ';'
      }
    }

    return mysql.format(sql)
  }

  countRows() {
    if (this.count) {
      return `${this.select} ${this.filter}${this.orderBy}`
    }
    return `SELECT COUNT(*) as Total FROM (${this.select} ${this.filter}${this.groupBy}${this.orderBy}) a ;`
  }
}
