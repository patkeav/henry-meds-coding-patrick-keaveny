import { Provider } from '../models/Provider.model';

const providerData: Provider[] = [{
    id: 1,
    name: 'Dr Joe Testerson',
    variant: 'primary',
    schedule: []
},
{
    id: 2,
    name: 'Dr Jill Testerson',
    variant: 'secondary',
    schedule: []
},
{
    id: 3,
    name: 'Dr Mrs The Monarch',
    variant: 'info',
    schedule: []
},
{
    id: 4,
    name: 'Dr Dre',
    variant: 'success',
    schedule: []
}];

const PROVIDERS = {
    get: () => {
        return providerData;
    }
};

export default PROVIDERS;