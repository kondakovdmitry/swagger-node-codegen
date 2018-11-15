{{#each operation}}
  {{#each this.path}}
    {{#validMethod @key}}
/**
 * @param {Object} options
{{#each ../parameters}}
{{#if this.name}}
 * @param {{../../../../openbrace}}{{jsType type}}{{../../../../closebrace}} options.{{name}} {{inline description}}
{{/if}}
{{/each}}
 * @throws {Error}
 * @return {Promise}
 */
module.exports.{{../operationId}} = async (options) => {
  {{#with (lookup ../responses "200")}}
    {{#with (lookup ./content "application/json")}}
  return {{> exampleItem schema=schema}};
    {{/with}}
  {{else}}
  return {
    status: 204
  };
  {{/with}}
};

    {{/validMethod}}
  {{/each}}
{{/each}}
