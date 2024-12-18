export interface PlottablePropertyConfig<MyType, ParentType> {
    propertyName: string;
    nBins: number;
    collector: (parent: ParentType) => MyType;
    qunatifier: (me: MyType) => number;
    exposer: (me: number) => string;
    minVal?: number;
    maxVal?: number;
}


export default class Formatter<Type> {
    formatData(data: Type[], plottablePropertyConfig: PlottablePropertyConfig<unknown, Type>) {
        const qunatifiedData = data
            .map(plottablePropertyConfig.collector)
            .filter((date) => date !== undefined)
            .map(plottablePropertyConfig.qunatifier);

        if (qunatifiedData.length === 0) {
            return [];
        }

        qunatifiedData.sort((a, b) => a - b);

        const minDate = plottablePropertyConfig.minVal ?? qunatifiedData[0];
        const maxDate = plottablePropertyConfig.maxVal ?? qunatifiedData[qunatifiedData.length - 1];
        const binSize = (maxDate - minDate) / plottablePropertyConfig.nBins;

        const bins = [];

        let index = 0;
        for (let i = 0; i < plottablePropertyConfig.nBins; i++) {
            const endDate = minDate + (i + 1) * binSize;
            let count = 0;
            while (index < qunatifiedData.length && qunatifiedData[index] <= endDate) {
                count++;
                index++;
            }
            const bin: { [key: string]: string | number } = {};
            bin[plottablePropertyConfig.propertyName] = plottablePropertyConfig.exposer(endDate - binSize / 2);
            bin["Number of Matches"] = count;
            bins.push(bin);
        }

        return bins;
    }
}