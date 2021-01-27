import AsyncStorage from '@react-native-async-storage/async-storage';

class UbicationStorageService {

    static async setWhereData({
        whereText,
        whereLatitude,
        whereLongitude
    }){
        await AsyncStorage.setItem("WHERE", JSON.stringify({ whereLatitude, whereLongitude, whereText }));
    }

    static async setDropData({
        dropText,
        dropLatitude,
        dropLongitude
    }){
        await AsyncStorage.setItem("DROP", JSON.stringify({ dropText, dropLongitude, dropLatitude }));
    }

    static async getUbications(){
        return await AsyncStorage.multiGet([
            'WHERE',
            'DROP',
        ]);
    }
}

export {
    UbicationStorageService
}