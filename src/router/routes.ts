type Route = {
  name: string;
  path: string;
};

type RoutesList = {
  [key: string]: Route;
};

export const routesList: RoutesList = {
  operations: {
    name: 'Operations',
    path: '/',
  },
  editOperation: {
    name: 'EditOperation',
    path: '/edit-operation/:id',
  },
  addOperation: {
    name: 'AddOperation',
    path: '/add-operation/',
  },
};
