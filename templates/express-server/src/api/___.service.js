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
  return {
    status: 200,
    data: '{{../operationId}} ok!'
  };
};

    {{/validMethod}}
  {{/each}}
{{/each}}
