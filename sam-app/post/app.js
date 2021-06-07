const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient({region: 'ap-northeast-1'})

exports.lambdaHandler = async (event, _) => {
  const requestBody = JSON.parse(event.body)

  const table = 'postItems'
  const items = {
    partitionKey: requestBody.partitionKey,
  }
  const params = {
    TableName: table,
    Item: items,
  }

  try {
    await dynamo.put(params, (err, data) => {
      if (err) console.error(err)
    }).promise()

    const response = {
      statusCode: 200,
      body: JSON.stringify(items)
    }
    return response
  } catch(err) {
    console.error(err)
    return err
  }
}
