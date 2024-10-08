

export const formatDateNext = (tanggal: any) => {
    const date = new Date(tanggal);  // Pastikan 'tanggal' adalah objek Date

    // Cek apakah 'date' adalah objek Date yang valid
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }

    const tahun = date.getFullYear();
    const bulan = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0, jadi tambahkan 1
    const hari = String(date.getDate()).padStart(2, '0');

    return `${tahun}-${bulan}-${hari}`;
};

export const statusChange = (value: string) => {
    if (value === 'Diproses') {
        return ('bg-[#FF7F0A]')
    } else if (value === 'Menunggu') {
        return ('bg-primary')
    } else if (value === 'Selesai') {
        return ('bg-lime-700')
    }
}


export const formatDate = (tanggal: any) => {
    if (!tanggal) {
        console.error("Tanggal tidak ada:", tanggal);
        return "Invalid date";  // Mengembalikan nilai default jika tanggal tidak ada
    }

    // Pastikan bahwa 'tanggal' merupakan string atau objek Date yang valid
    const date = new Date(tanggal);

    // Cek apakah objek Date valid
    if (isNaN(date.getTime())) {
        console.error("Format tanggal tidak valid:", tanggal);
        return "Invalid date";  // Mengembalikan nilai default jika format tanggal tidak valid
    }

    const tahun = date.getFullYear();
    const bulan = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0, jadi tambahkan 1
    const hari = String(date.getDate()).padStart(2, '0');

    return `${tahun}-${bulan}-${hari}`;
};


export function formatCatrgory(text: string, maxLength: number = 34): string {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
}
export function formatNews(text: string, maxLength: number = 43): string {
    // Menghapus elemen HTML menggunakan regex
    const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");

    // Memotong teks jika panjangnya melebihi maxLength
    if (cleanText.length > maxLength) {
        return cleanText.slice(0, maxLength) + "...";
    }
    return cleanText;
}





export function formatRupiah(amount: number | undefined): string {
    if (amount === undefined) {
        return 'Rp 0';
    }
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}


export function capitalizeWords(str: string): string {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}


export const formatDateStr = (dateObj?: { month: number, day: number, year: number }) =>
    dateObj ? `${dateObj.month.toString().padStart(2, '0')}-${dateObj.day.toString().padStart(2, '0')}-${dateObj.year.toString().padStart(4, '0')}` : '';

export const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const parseCoordinate = (coord: string): number => {
    const parsedCoord = parseFloat(coord);
    if (isNaN(parsedCoord)) {
        throw new Error(`Invalid coordinate value: ${coord}`);
    }
    return parsedCoord;
};

const dateNow = new Date();
export const dateFirst = getFirstDayOfMonth(dateNow);