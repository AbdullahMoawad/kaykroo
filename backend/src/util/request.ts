import {getRepository} from 'typeorm';
import {cleanData} from './string';


export async function getPageData(req: any, model: any): Promise<object> {
  const {sortBy, sort, page, pageSize} = await getGridParams(req);
  const filter = req.query.filter ? req.query.filter : {};
  const whereObject = {}

  try {
    const total = await getRepository(model).count(whereObject);

    let skip = (total > pageSize && page != 1) ? (pageSize * (page - 1)) : 0;
    skip = skip < 0 ? 0 : skip;
    whereObject.skip = skip;
    whereObject.take = pageSize;
    let order = {};
    order[sortBy] = sort;
    whereObject.order = order;

    let data = await getRepository(model).find(whereObject);
    data = await cleanData(new model, data);
    return {
      data,
      total,
      page,
      pageSize,
      skip,
      sortBy,
      filters: filter
    };
  } catch (e) {
    console.log(e);
    return {};
  }
}

export const getGridParams = async (req) => {

  let sort = req.query.sort?.toUpperCase() || -1;
  if (sort !== 'ASC' && sort !== 'DESC') {
    sort = 'DESC';
  }

  let pageSize = req.query.pageSize || 25;
  let page = req.query.page || 1;
  let sortBy = req.query.sortField || 'createdAt';

  if (sortBy == 'undefined') {
    sortBy = 'createdAt';
  }

  pageSize = parseInt(pageSize, 10);
  page = parseInt(page, 10);

  return {sort, sortBy, page, pageSize};
};


export const ValidationError = (field: string, error: string, status = 400) => {
  return {
    'status': status,
    'name': 'Error',
    'message': error,
    'errors': [
      {
        'value': '',
        'msg': error,
        'param': field,
        'location': 'body'
      }
    ]
  };
};

export const ServerError = (error: string = '', status = 500) => {

  return {
    'status': status ? status : 'Server Error',
    'name': 'Error',
    'message': error,
    'errors': []
  };
};
