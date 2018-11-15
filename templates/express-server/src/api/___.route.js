const express = require('express');
const Joi = require('joi');
const {{camelCase operation_name}}Service = require('./{{operation_name}}.service');

const router = new express.Router();

{{#each operation}}
  {{#each this.path}}
    {{#validMethod @key}}
/**
 {{#each ../descriptionLines}}
 * {{{this}}}
 {{/each}}
 */
router.{{@key}}('{{../../subresource}}', async (req, res) => {
  const options = {
    {{#if ../requestBody}}
    body: req.body,
    {{/if}}
    {{#each ../parameters}}
      {{#equal this.in "query"}}
    {{{quote ../name}}}: req.query['{{../name}}'],
      {{/equal}}
      {{#equal this.in "path"}}
    {{{quote ../name}}}: req.params['{{../name}}'],
      {{/equal}}
      {{#match @../key "(post|put)"}}
        {{#equal ../in "body"}}
    {{{quote ../name}}}: req.body['{{../name}}'],
        {{/equal}}
      {{/match}}
    {{/each}}
  };

  const schema = Joi.object().keys({
    {{#if ../requestBody}}
    body: Joi.object(),
    {{/if}}
    {{#each ../parameters}}
    {{{quote name}}}: {{joiDefinition schema required}},
    {{/each}}
  });

  const result = schema.validate(options);
  if (result.error) {
    return res.status(400).send({
      status: 400,
      error: result.error.details[0].message,
    })
  }

  try {
    const result = await {{camelCase ../../../operation_name}}Service.{{../operationId}}(options);
    {{#ifNoSuccessResponses ../responses}}
    res.status(200).send(result.data);
    {{else}}
    res.status(result.status || 200).send(result.data);
    {{/ifNoSuccessResponses}}
  } catch (err) {
    {{#ifNoErrorResponses ../responses}}
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
    {{else}}
    return res.status(err.status).send({
      status: err.status,
      error: err.error
    });
    {{/ifNoErrorResponses}}
  }
});

    {{/validMethod}}
  {{/each}}
{{/each}}
module.exports = router;
