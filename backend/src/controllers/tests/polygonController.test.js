import { createPolygon } from '../polygonController.js';
import polygonService from '../../services/polygonService.js';

jest.mock('../../services/polygonService.js');

describe('createPolygon', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        name: 'Test Polygon',
        geoJson: {
          id: 'test-id',
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[[0, 0], [1, 1], [1, 0], [0, 0]]]
          }
        },
        id: 'test-id'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a polygon and return 201 status code', async () => {
    const mockPolygon = { id: 'test-id', name: 'Test Polygon', geometry: req.body.geoJson.geometry };
    polygonService.createPolygon.mockResolvedValue(mockPolygon);

    await createPolygon(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockPolygon);
  });

  it('should return 500 status code if the service throws an error', async () => {
    polygonService.createPolygon.mockRejectedValue(new Error('Service Error'));

    await createPolygon(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
