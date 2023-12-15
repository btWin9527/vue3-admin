const toUpperCase = str => str.charAt(0).toUpperCase() + str.slice(1);

module.exports = {
  description: "Create a new view",
  prompts: [
    // {
    //   type: "input",
    //   name: "path",
    //   message: "请输入路径(Please enter a path)",
    //   defaults: "views"
    // },
    {
      type: "input",
      name: "name",
      message: "请输入模块名称(Please enter module name)"
    }
  ],
  actions: (data) => {
    const { name } = data;
    const upperFirstName = toUpperCase(name);

    const actions = [];
    if (name) {
      actions.push({
        type: "add",
        path: `./src/views/${upperFirstName}/${upperFirstName}.vue`,
        templateFile: "./plop/view/view.hbs",
        data: {
          name,
          upperFirstName
        }
      });
    }
    return actions;
  }
};
