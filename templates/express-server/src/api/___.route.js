const express = require('express');
const Joi = require('joi');
const helpers = require('../lib/helpers');
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
router.{{@key}}('{{../../subresource}}', helpers.asyncMiddleware(async (req, res) => {
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
    body:
      {{#with (lookup ../requestBody/content "application/json")}}
      {{> joiDefinition schema=schema required=true}}
      {{/with}}
      {{#with (lookup ../requestBody/content "multipart/form-data")}}
      {{> joiDefinition schema=schema required=true}}
      {{/with}},
    {{/if}}
    {{#each ../parameters}}
    {{{quote name}}}: {{> joiDefinition schema=schema required=required}},
    {{/each}}
  });

  helpers.validate(schema, options);

  const result = await {{camelCase ../../../operation_name}}Service.{{../operationId}}(options);
  {{#ifNoSuccessResponses ../responses}}
  res.status(200).send(result.data);
  {{else}}
  res.status(result.status || 200).send(result.data);
  {{/ifNoSuccessResponses}}
}));

    {{/validMethod}}
  {{/each}}
{{/each}}
module.exports = router;
