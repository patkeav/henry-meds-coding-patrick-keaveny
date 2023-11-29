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
    },
    set: (id: number, slot: { date: string, slotTime: Date; }) => {
        const index = providerData.findIndex((p => p.id === id));
        if (index > -1) {
            const dateIndex = providerData[index].schedule.findIndex(s => s.date === slot.date);
            if (dateIndex > -1) {
                providerData[index].schedule[dateIndex].slots.push({
                    date: slot.slotTime, reserved: false, confirmed: false

                });
            } else {
                providerData[index].schedule.push({
                    date: slot.date, slots: [{
                        date: slot.slotTime, reserved: false, confirmed: false,
                    }]
                });
            }
        }
    },
};

export default PROVIDERS;