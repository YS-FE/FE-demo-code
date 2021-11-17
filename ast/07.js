async function generatorEntryFile (outDir, routesPath, routesComponent) {

  let routesPathStr = JSON.stringify(routesPath);

  let microRoutesContent = `
  import React from 'react';
  import {
      Switch,
      Route,
      Redirect,
  } from 'react-router-dom';
  import microConfig from '../wmad-micro.json';
  `;


  let loadComponent = '';
  let routeConfig = '';


  routesComponent.forEach((component, index) => {
    loadComponent += `import R2XComponent${index} from '${component}'; \n`;
    routeConfig += `
    {
      path: ${routesPathStr}[${index}],
      component: R2XComponent${index}
    },
    `;
  });


  microRoutesContent += loadComponent;
  microRoutesContent += 
  `
  const urlPrefix = '/subapp/' + microConfig.name;
  const microRoutes = [
    ${routeConfig}
  ]

  const AppRoutes = () => (
    <Switch>a
        {
          microRoutes.map(item => (
                <Route
                    key={item.path}
                    exact
                    path={urlPrefix + item.path}
                    component={item.component}
                />
            ))
        }
        <Redirect
            from={urlPrefix}
            to="/index"
        />
    </Switch>
  );

  export default AppRoutes;
  `;


  console.log(microRoutesContent);
}



generatorEntryFile('./temp', ['/a', '/b'], ['./page/a', './page/b']);