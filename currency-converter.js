/**
 * Currency Converter & Detection System
 * Prickly Pair Studios - 2024
 * 
 * Features:
 * - Auto-detect user's country/currency
 * - Manual currency selection
 * - Real-time currency conversion
 * - Persistent currency preference
 * - Fallback to free APIs
 */

class CurrencyConverter {
    constructor() {
        this.baseRates = {
            // Base conversion rates (updated periodically)
            // ZAR is base currency (1 ZAR = X foreign currency)
            'ZAR': 1,
            'USD': 0.053,    // 1 ZAR = 0.053 USD
            'EUR': 0.049,    // 1 ZAR = 0.049 EUR
            'GBP': 0.042,    // 1 ZAR = 0.042 GBP
            'AUD': 0.082,    // 1 ZAR = 0.082 AUD
            'CAD': 0.073,    // 1 ZAR = 0.073 CAD
            'CHF': 0.047,    // 1 ZAR = 0.047 CHF
            'JPY': 7.8,      // 1 ZAR = 7.8 JPY
            'CNY': 0.38,     // 1 ZAR = 0.38 CNY
            'INR': 4.5,      // 1 ZAR = 4.5 INR
            'BRL': 0.32,     // 1 ZAR = 0.32 BRL
            'MXN': 1.08,     // 1 ZAR = 1.08 MXN
            'NGN': 82.5,     // 1 ZAR = 82.5 NGN
            'KES': 7.2,      // 1 ZAR = 7.2 KES
            'GHS': 0.84,     // 1 ZAR = 0.84 GHS
            'EGP': 2.63,     // 1 ZAR = 2.63 EGP
            'MAD': 0.55,     // 1 ZAR = 0.55 MAD
            'TND': 0.17,     // 1 ZAR = 0.17 TND
            'DZD': 7.2,      // 1 ZAR = 7.2 DZD
            'AED': 0.19,     // 1 ZAR = 0.19 AED
            'SAR': 0.20,     // 1 ZAR = 0.20 SAR
            'QAR': 0.19,     // 1 ZAR = 0.19 QAR
            'KWD': 0.016,    // 1 ZAR = 0.016 KWD
            'BHD': 0.020,    // 1 ZAR = 0.020 BHD
            'OMR': 0.020,    // 1 ZAR = 0.020 OMR
            'JOD': 0.038,    // 1 ZAR = 0.038 JOD
            'LBP': 80.5,     // 1 ZAR = 80.5 LBP
            'ILS': 0.19,     // 1 ZAR = 0.19 ILS
            'TRY': 1.85,     // 1 ZAR = 1.85 TRY
            'RUB': 5.3,      // 1 ZAR = 5.3 RUB
            'PLN': 0.22,     // 1 ZAR = 0.22 PLN
            'CZK': 1.23,     // 1 ZAR = 1.23 CZK
            'HUF': 20.8,     // 1 ZAR = 20.8 HUF
            'RON': 0.25,     // 1 ZAR = 0.25 RON
            'BGN': 0.096,    // 1 ZAR = 0.096 BGN
            'HRK': 0.37,     // 1 ZAR = 0.37 HRK
            'RSD': 5.75,     // 1 ZAR = 5.75 RSD
            'MKD': 3.0,      // 1 ZAR = 3.0 MKD
            'ALL': 4.98,     // 1 ZAR = 4.98 ALL
            'BAM': 0.096,    // 1 ZAR = 0.096 BAM
            'SEK': 0.57,     // 1 ZAR = 0.57 SEK
            'NOK': 0.59,     // 1 ZAR = 0.59 NOK
            'DKK': 0.36,     // 1 ZAR = 0.36 DKK
            'ISK': 7.3,      // 1 ZAR = 7.3 ISK
            'SGD': 0.072,    // 1 ZAR = 0.072 SGD
            'MYR': 0.24,     // 1 ZAR = 0.24 MYR
            'THB': 1.83,     // 1 ZAR = 1.83 THB
            'IDR': 843,      // 1 ZAR = 843 IDR
            'PHP': 3.08,     // 1 ZAR = 3.08 PHP
            'VND': 1358,     // 1 ZAR = 1358 VND
            'KRW': 73.5,     // 1 ZAR = 73.5 KRW
            'TWD': 1.73,     // 1 ZAR = 1.73 TWD
            'HKD': 0.41,     // 1 ZAR = 0.41 HKD
            'NZD': 0.089,    // 1 ZAR = 0.089 NZD
            'CLP': 52.8,     // 1 ZAR = 52.8 CLP
            'ARS': 55.8,     // 1 ZAR = 55.8 ARS
            'COP': 235,      // 1 ZAR = 235 COP
            'PEN': 0.20,     // 1 ZAR = 0.20 PEN
            'UYU': 2.3,      // 1 ZAR = 2.3 UYU
            'PYG': 415,      // 1 ZAR = 415 PYG
            'BOB': 0.37,     // 1 ZAR = 0.37 BOB
            'VES': 1.93,     // 1 ZAR = 1.93 VES
            'GTQ': 0.41,     // 1 ZAR = 0.41 GTQ
            'HNL': 1.32,     // 1 ZAR = 1.32 HNL
            'NIO': 1.96,     // 1 ZAR = 1.96 NIO
            'CRC': 27.2,     // 1 ZAR = 27.2 CRC
            'PAB': 0.053,    // 1 ZAR = 0.053 PAB
            'DOP': 3.2,      // 1 ZAR = 3.2 DOP
            'JMD': 8.3,      // 1 ZAR = 8.3 JMD
            'TTD': 0.36,     // 1 ZAR = 0.36 TTD
            'BZD': 0.11,     // 1 ZAR = 0.11 BZD
            'XCD': 0.14,     // 1 ZAR = 0.14 XCD
            'BBD': 0.11,     // 1 ZAR = 0.11 BBD
            'BSD': 0.053,    // 1 ZAR = 0.053 BSD
            'KYD': 0.044,    // 1 ZAR = 0.044 KYD
            'SVC': 0.46,     // 1 ZAR = 0.46 SVC
            'AWG': 0.095,    // 1 ZAR = 0.095 AWG
            'ANG': 0.095,    // 1 ZAR = 0.095 ANG
            'SRD': 1.89,     // 1 ZAR = 1.89 SRD
            'GYD': 11.1,     // 1 ZAR = 11.1 GYD
            'FJD': 0.12,     // 1 ZAR = 0.12 FJD
            'TOP': 0.125,    // 1 ZAR = 0.125 TOP
            'WST': 0.145,    // 1 ZAR = 0.145 WST
            'VUV': 6.3,      // 1 ZAR = 6.3 VUV
            'SBD': 0.45,     // 1 ZAR = 0.45 SBD
            'PGK': 0.21,     // 1 ZAR = 0.21 PGK
            'NCF': 5.8,      // 1 ZAR = 5.8 NCF
            'XPF': 5.8,      // 1 ZAR = 5.8 XPF
            'FKP': 0.042,    // 1 ZAR = 0.042 FKP
            'GIP': 0.042,    // 1 ZAR = 0.042 GIP
            'SHP': 0.042,    // 1 ZAR = 0.042 SHP
            'JEP': 0.042,    // 1 ZAR = 0.042 JEP
            'GGP': 0.042,    // 1 ZAR = 0.042 GGP
            'IMP': 0.042,    // 1 ZAR = 0.042 IMP
            'TVD': 0.089,    // 1 ZAR = 0.089 TVD
            'NRU': 0.089,    // 1 ZAR = 0.089 NRU
            'KID': 0.082,    // 1 ZAR = 0.082 KID
            'CKI': 0.089,    // 1 ZAR = 0.089 CKI
            'NIO': 1.96,     // 1 ZAR = 1.96 NIO
            'BWP': 0.73,     // 1 ZAR = 0.73 BWP
            'SZL': 1.0,      // 1 ZAR = 1.0 SZL
            'LSL': 1.0,      // 1 ZAR = 1.0 LSL
            'NAD': 1.0,      // 1 ZAR = 1.0 NAD
            'ZWL': 345,      // 1 ZAR = 345 ZWL
            'MZN': 3.42,     // 1 ZAR = 3.42 MZN
            'AOA': 47.5,     // 1 ZAR = 47.5 AOA
            'ZMW': 1.48,     // 1 ZAR = 1.48 ZMW
            'MWK': 92.8,     // 1 ZAR = 92.8 MWK
            'TZS': 134,      // 1 ZAR = 134 TZS
            'UGX': 198,      // 1 ZAR = 198 UGX
            'RWF': 73.5,     // 1 ZAR = 73.5 RWF
            'BIF': 157,      // 1 ZAR = 157 BIF
            'ETB': 6.58,     // 1 ZAR = 6.58 ETB
            'ERN': 0.80,     // 1 ZAR = 0.80 ERN
            'DJF': 9.5,      // 1 ZAR = 9.5 DJF
            'SOS': 30.5,     // 1 ZAR = 30.5 SOS
            'SCR': 0.71,     // 1 ZAR = 0.71 SCR
            'MUR': 2.46,     // 1 ZAR = 2.46 MUR
            'KMF': 24.1,     // 1 ZAR = 24.1 KMF
            'MGA': 243,      // 1 ZAR = 243 MGA
            'XAF': 32.1,     // 1 ZAR = 32.1 XAF
            'XOF': 32.1,     // 1 ZAR = 32.1 XOF
            'GMD': 3.58,     // 1 ZAR = 3.58 GMD
            'GNF': 461,      // 1 ZAR = 461 GNF
            'SLE': 1.21,     // 1 ZAR = 1.21 SLE
            'LRD': 10.1,     // 1 ZAR = 10.1 LRD
            'CVE': 5.4,      // 1 ZAR = 5.4 CVE
            'STN': 1.2,      // 1 ZAR = 1.2 STN
            'CDF': 148,      // 1 ZAR = 148 CDF
            'XDR': 0.040,    // 1 ZAR = 0.040 XDR
            'SDG': 32.1,     // 1 ZAR = 32.1 SDG
            'SSP': 69.8,     // 1 ZAR = 69.8 SSP
            'LYD': 0.26,     // 1 ZAR = 0.26 LYD
            'AFN': 3.68,     // 1 ZAR = 3.68 AFN
            'PKR': 14.8,     // 1 ZAR = 14.8 PKR
            'BDT': 6.35,     // 1 ZAR = 6.35 BDT
            'LKR': 15.5,     // 1 ZAR = 15.5 LKR
            'MVR': 0.82,     // 1 ZAR = 0.82 MVR
            'NPR': 7.2,      // 1 ZAR = 7.2 NPR
            'BTN': 4.5,      // 1 ZAR = 4.5 BTN
            'MMK': 112,      // 1 ZAR = 112 MMK
            'KHR': 218,      // 1 ZAR = 218 KHR
            'LAK': 1158,     // 1 ZAR = 1158 LAK
            'BND': 0.072,    // 1 ZAR = 0.072 BND
            'MNT': 182,      // 1 ZAR = 182 MNT
            'KZT': 26.5,     // 1 ZAR = 26.5 KZT
            'UZS': 686,      // 1 ZAR = 686 UZS
            'KGS': 4.58,     // 1 ZAR = 4.58 KGS
            'TJS': 0.57,     // 1 ZAR = 0.57 TJS
            'TMT': 0.185,    // 1 ZAR = 0.185 TMT
            'GEL': 0.145,    // 1 ZAR = 0.145 GEL
            'AMD': 20.7,     // 1 ZAR = 20.7 AMD
            'AZN': 0.090,    // 1 ZAR = 0.090 AZN
            'BYN': 0.175,    // 1 ZAR = 0.175 BYN
            'MDL': 0.97,     // 1 ZAR = 0.97 MDL
            'UAH': 2.22,     // 1 ZAR = 2.22 UAH
            'EUR': 0.049,    // 1 ZAR = 0.049 EUR (repeated for clarity)
        };

        this.currencySymbols = {
            'ZAR': 'R',
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'AUD': 'A$',
            'CAD': 'C$',
            'CHF': 'CHF',
            'JPY': '¥',
            'CNY': '¥',
            'INR': '₹',
            'BRL': 'R$',
            'MXN': '$',
            'NGN': '₦',
            'KES': 'KSh',
            'GHS': '₵',
            'EGP': '£',
            'MAD': 'DH',
            'TND': 'DT',
            'DZD': 'DA',
            'AED': 'AED',
            'SAR': 'SR',
            'QAR': 'QR',
            'KWD': 'KD',
            'BHD': 'BD',
            'OMR': 'OR',
            'JOD': 'JD',
            'LBP': 'LP',
            'ILS': '₪',
            'TRY': '₺',
            'RUB': '₽',
            'PLN': 'zł',
            'CZK': 'Kč',
            'HUF': 'Ft',
            'RON': 'lei',
            'BGN': 'лв',
            'HRK': 'kn',
            'RSD': 'din',
            'MKD': 'ден',
            'ALL': 'L',
            'BAM': 'KM',
            'SEK': 'kr',
            'NOK': 'kr',
            'DKK': 'kr',
            'ISK': 'kr',
            'SGD': 'S$',
            'MYR': 'RM',
            'THB': '฿',
            'IDR': 'Rp',
            'PHP': '₱',
            'VND': '₫',
            'KRW': '₩',
            'TWD': 'NT$',
            'HKD': 'HK$',
            'NZD': 'NZ$',
            'CLP': '$',
            'ARS': '$',
            'COP': '$',
            'PEN': 'S/',
            'UYU': '$U',
            'PYG': '₲',
            'BOB': 'Bs',
            'VES': 'Bs',
            'GTQ': 'Q',
            'HNL': 'L',
            'NIO': 'C$',
            'CRC': '₡',
            'PAB': 'B/.',
            'DOP': 'RD$',
            'JMD': 'J$',
            'TTD': 'TT$',
            'BZD': 'BZ$',
            'XCD': 'EC$',
            'BBD': 'Bds$',
            'BSD': 'B$',
            'KYD': 'CI$',
            'SVC': '₡',
            'AWG': 'ƒ',
            'ANG': 'NAf',
            'SRD': '$',
            'GYD': 'G$',
            'FJD': 'FJ$',
            'TOP': 'T$',
            'WST': 'WS$',
            'VUV': 'VT',
            'SBD': 'SI$',
            'PGK': 'K',
            'NCF': 'F',
            'XPF': 'F',
            'FKP': '£',
            'GIP': '£',
            'SHP': '£',
            'JEP': '£',
            'GGP': '£',
            'IMP': '£',
            'TVD': 'A$',
            'NRU': 'A$',
            'KID': 'A$',
            'CKI': 'NZ$',
            'BWP': 'P',
            'SZL': 'E',
            'LSL': 'L',
            'NAD': 'N$',
            'ZWL': 'Z$',
            'MZN': 'MT',
            'AOA': 'Kz',
            'ZMW': 'ZK',
            'MWK': 'MK',
            'TZS': 'TSh',
            'UGX': 'USh',
            'RWF': 'RF',
            'BIF': 'FBu',
            'ETB': 'Br',
            'ERN': 'Nfk',
            'DJF': 'Fdj',
            'SOS': 'Sh',
            'SCR': 'SR',
            'MUR': 'Rs',
            'KMF': 'CF',
            'MGA': 'Ar',
            'XAF': 'FCFA',
            'XOF': 'CFA',
            'GMD': 'D',
            'GNF': 'FG',
            'SLE': 'Le',
            'LRD': 'L$',
            'CVE': '$',
            'STN': 'Db',
            'CDF': 'FC',
            'XDR': 'SDR',
            'SDG': 'SDG',
            'SSP': '£',
            'LYD': 'LD',
            'AFN': '؋',
            'PKR': 'Rs',
            'BDT': '৳',
            'LKR': 'Rs',
            'MVR': 'Rf',
            'NPR': 'Rs',
            'BTN': 'Nu',
            'MMK': 'K',
            'KHR': '៛',
            'LAK': '₭',
            'BND': 'B$',
            'MNT': '₮',
            'KZT': '₸',
            'UZS': 'сўм',
            'KGS': 'сом',
            'TJS': 'SM',
            'TMT': 'T',
            'GEL': '₾',
            'AMD': '֏',
            'AZN': '₼',
            'BYN': 'Br',
            'MDL': 'L',
            'UAH': '₴'
        };

        this.countryToCurrency = {
            'ZA': 'ZAR', 'US': 'USD', 'GB': 'GBP', 'EU': 'EUR', 'DE': 'EUR', 'FR': 'EUR', 'IT': 'EUR', 'ES': 'EUR', 'NL': 'EUR', 'BE': 'EUR', 'AT': 'EUR', 'PT': 'EUR', 'IE': 'EUR', 'FI': 'EUR', 'GR': 'EUR', 'LU': 'EUR', 'MT': 'EUR', 'CY': 'EUR', 'SK': 'EUR', 'SI': 'EUR', 'EE': 'EUR', 'LV': 'EUR', 'LT': 'EUR',
            'AU': 'AUD', 'CA': 'CAD', 'CH': 'CHF', 'JP': 'JPY', 'CN': 'CNY', 'IN': 'INR', 'BR': 'BRL', 'MX': 'MXN', 'NG': 'NGN', 'KE': 'KES', 'GH': 'GHS', 'EG': 'EGP', 'MA': 'MAD', 'TN': 'TND', 'DZ': 'DZD', 'AE': 'AED', 'SA': 'SAR', 'QA': 'QAR', 'KW': 'KWD', 'BH': 'BHD', 'OM': 'OMR', 'JO': 'JOD', 'LB': 'LBP', 'IL': 'ILS', 'TR': 'TRY', 'RU': 'RUB', 'PL': 'PLN', 'CZ': 'CZK', 'HU': 'HUF', 'RO': 'RON', 'BG': 'BGN', 'HR': 'HRK', 'RS': 'RSD', 'MK': 'MKD', 'AL': 'ALL', 'BA': 'BAM', 'SE': 'SEK', 'NO': 'NOK', 'DK': 'DKK', 'IS': 'ISK', 'SG': 'SGD', 'MY': 'MYR', 'TH': 'THB', 'ID': 'IDR', 'PH': 'PHP', 'VN': 'VND', 'KR': 'KRW', 'TW': 'TWD', 'HK': 'HKD', 'NZ': 'NZD', 'CL': 'CLP', 'AR': 'ARS', 'CO': 'COP', 'PE': 'PEN', 'UY': 'UYU', 'PY': 'PYG', 'BO': 'BOB', 'VE': 'VES', 'GT': 'GTQ', 'HN': 'HNL', 'NI': 'NIO', 'CR': 'CRC', 'PA': 'PAB', 'DO': 'DOP', 'JM': 'JMD', 'TT': 'TTD', 'BZ': 'BZD', 'BB': 'BBD', 'BS': 'BSD', 'KY': 'KYD', 'SV': 'SVC', 'AW': 'AWG', 'AN': 'ANG', 'SR': 'SRD', 'GY': 'GYD', 'FJ': 'FJD', 'TO': 'TOP', 'WS': 'WST', 'VU': 'VUV', 'SB': 'SBD', 'PG': 'PGK', 'NC': 'NCF', 'PF': 'XPF', 'FK': 'FKP', 'GI': 'GIP', 'SH': 'SHP', 'JE': 'JEP', 'GG': 'GGP', 'IM': 'IMP', 'TV': 'TVD', 'NR': 'NRU', 'KI': 'KID', 'CK': 'CKI', 'BW': 'BWP', 'SZ': 'SZL', 'LS': 'LSL', 'NA': 'NAD', 'ZW': 'ZWL', 'MZ': 'MZN', 'AO': 'AOA', 'ZM': 'ZMW', 'MW': 'MWK', 'TZ': 'TZS', 'UG': 'UGX', 'RW': 'RWF', 'BI': 'BIF', 'ET': 'ETB', 'ER': 'ERN', 'DJ': 'DJF', 'SO': 'SOS', 'SC': 'SCR', 'MU': 'MUR', 'KM': 'KMF', 'MG': 'MGA', 'CF': 'XAF', 'TD': 'XAF', 'CM': 'XAF', 'GA': 'XAF', 'GQ': 'XAF', 'CG': 'XAF', 'BF': 'XOF', 'BJ': 'XOF', 'CI': 'XOF', 'GW': 'XOF', 'ML': 'XOF', 'NE': 'XOF', 'SN': 'XOF', 'TG': 'XOF', 'GM': 'GMD', 'GN': 'GNF', 'SL': 'SLE', 'LR': 'LRD', 'CV': 'CVE', 'ST': 'STN', 'CD': 'CDF', 'SD': 'SDG', 'SS': 'SSP', 'LY': 'LYD', 'AF': 'AFN', 'PK': 'PKR', 'BD': 'BDT', 'LK': 'LKR', 'MV': 'MVR', 'NP': 'NPR', 'BT': 'BTN', 'MM': 'MMK', 'KH': 'KHR', 'LA': 'LAK', 'BN': 'BND', 'MN': 'MNT', 'KZ': 'KZT', 'UZ': 'UZS', 'KG': 'KGS', 'TJ': 'TJS', 'TM': 'TMT', 'GE': 'GEL', 'AM': 'AMD', 'AZ': 'AZN', 'BY': 'BYN', 'MD': 'MDL', 'UA': 'UAH'
        };

        this.currentCurrency = this.getStoredCurrency() || 'ZAR';
        this.currentRates = this.baseRates;
        this.lastUpdate = new Date();
        
        this.init();
    }

    async init() {
        // Auto-detect currency if not set
        if (!this.getStoredCurrency()) {
            await this.autoDetectCurrency();
        }
        
        // Try to update exchange rates
        await this.updateExchangeRates();
        
        // Initialize currency selector
        this.initializeCurrencySelector();
        
        // Convert all prices on page load
        this.convertAllPrices();
    }

    async autoDetectCurrency() {
        try {
            // Method 1: Try to get user's country from timezone
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const countryFromTimezone = this.getCountryFromTimezone(timezone);
            
            if (countryFromTimezone && this.countryToCurrency[countryFromTimezone]) {
                this.currentCurrency = this.countryToCurrency[countryFromTimezone];
                this.storeCurrency(this.currentCurrency);
                return;
            }

            // Method 2: Try IP geolocation (fallback)
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            if (data.country_code && this.countryToCurrency[data.country_code]) {
                this.currentCurrency = this.countryToCurrency[data.country_code];
                this.storeCurrency(this.currentCurrency);
                return;
            }

            // Method 3: Browser language fallback
            const language = navigator.language || navigator.languages[0];
            const countryFromLang = language.split('-')[1];
            
            if (countryFromLang && this.countryToCurrency[countryFromLang.toUpperCase()]) {
                this.currentCurrency = this.countryToCurrency[countryFromLang.toUpperCase()];
                this.storeCurrency(this.currentCurrency);
                return;
            }

        } catch (error) {
            console.warn('Currency auto-detection failed:', error);
            // Keep default ZAR
        }
    }

    getCountryFromTimezone(timezone) {
        const timezoneToCountry = {
            'Africa/Johannesburg': 'ZA',
            'America/New_York': 'US',
            'America/Chicago': 'US',
            'America/Denver': 'US',
            'America/Los_Angeles': 'US',
            'Europe/London': 'GB',
            'Europe/Paris': 'FR',
            'Europe/Berlin': 'DE',
            'Europe/Rome': 'IT',
            'Europe/Madrid': 'ES',
            'Europe/Amsterdam': 'NL',
            'Europe/Brussels': 'BE',
            'Europe/Vienna': 'AT',
            'Europe/Lisbon': 'PT',
            'Europe/Dublin': 'IE',
            'Europe/Helsinki': 'FI',
            'Europe/Athens': 'GR',
            'Europe/Luxembourg': 'LU',
            'Europe/Valletta': 'MT',
            'Europe/Nicosia': 'CY',
            'Europe/Bratislava': 'SK',
            'Europe/Ljubljana': 'SI',
            'Europe/Tallinn': 'EE',
            'Europe/Riga': 'LV',
            'Europe/Vilnius': 'LT',
            'Australia/Sydney': 'AU',
            'Australia/Melbourne': 'AU',
            'Australia/Perth': 'AU',
            'America/Toronto': 'CA',
            'America/Vancouver': 'CA',
            'Europe/Zurich': 'CH',
            'Asia/Tokyo': 'JP',
            'Asia/Shanghai': 'CN',
            'Asia/Kolkata': 'IN',
            'America/Sao_Paulo': 'BR',
            'America/Mexico_City': 'MX',
            'Africa/Lagos': 'NG',
            'Africa/Nairobi': 'KE',
            'Africa/Accra': 'GH',
            'Africa/Cairo': 'EG',
            'Africa/Casablanca': 'MA',
            'Africa/Tunis': 'TN',
            'Africa/Algiers': 'DZ',
            'Asia/Dubai': 'AE',
            'Asia/Riyadh': 'SA',
            'Asia/Qatar': 'QA',
            'Asia/Kuwait': 'KW',
            'Asia/Bahrain': 'BH',
            'Asia/Muscat': 'OM',
            'Asia/Amman': 'JO',
            'Asia/Beirut': 'LB',
            'Asia/Jerusalem': 'IL',
            'Europe/Istanbul': 'TR',
            'Europe/Moscow': 'RU',
            'Europe/Warsaw': 'PL',
            'Europe/Prague': 'CZ',
            'Europe/Budapest': 'HU',
            'Europe/Bucharest': 'RO',
            'Europe/Sofia': 'BG',
            'Europe/Zagreb': 'HR',
            'Europe/Belgrade': 'RS',
            'Europe/Skopje': 'MK',
            'Europe/Tirana': 'AL',
            'Europe/Sarajevo': 'BA',
            'Europe/Stockholm': 'SE',
            'Europe/Oslo': 'NO',
            'Europe/Copenhagen': 'DK',
            'Atlantic/Reykjavik': 'IS',
            'Asia/Singapore': 'SG',
            'Asia/Kuala_Lumpur': 'MY',
            'Asia/Bangkok': 'TH',
            'Asia/Jakarta': 'ID',
            'Asia/Manila': 'PH',
            'Asia/Ho_Chi_Minh': 'VN',
            'Asia/Seoul': 'KR',
            'Asia/Taipei': 'TW',
            'Asia/Hong_Kong': 'HK',
            'Pacific/Auckland': 'NZ',
            'America/Santiago': 'CL',
            'America/Argentina/Buenos_Aires': 'AR',
            'America/Bogota': 'CO',
            'America/Lima': 'PE',
            'America/Montevideo': 'UY',
            'America/Asuncion': 'PY',
            'America/La_Paz': 'BO',
            'America/Caracas': 'VE',
            'America/Guatemala': 'GT',
            'America/Tegucigalpa': 'HN',
            'America/Managua': 'NI',
            'America/Costa_Rica': 'CR',
            'America/Panama': 'PA',
            'America/Santo_Domingo': 'DO',
            'America/Jamaica': 'JM',
            'America/Port_of_Spain': 'TT',
            'America/Belize': 'BZ',
            'America/Barbados': 'BB',
            'America/Nassau': 'BS',
            'America/Cayman': 'KY',
            'America/El_Salvador': 'SV',
            'America/Aruba': 'AW',
            'America/Curacao': 'AN',
            'America/Paramaribo': 'SR',
            'America/Guyana': 'GY',
            'Pacific/Fiji': 'FJ',
            'Pacific/Tongatapu': 'TO',
            'Pacific/Apia': 'WS',
            'Pacific/Efate': 'VU',
            'Pacific/Guadalcanal': 'SB',
            'Pacific/Port_Moresby': 'PG',
            'Pacific/Noumea': 'NC',
            'Pacific/Tahiti': 'PF',
            'Atlantic/Stanley': 'FK',
            'Europe/Gibraltar': 'GI',
            'Atlantic/St_Helena': 'SH',
            'Europe/Jersey': 'JE',
            'Europe/Guernsey': 'GG',
            'Europe/Isle_of_Man': 'IM',
            'Pacific/Funafuti': 'TV',
            'Pacific/Nauru': 'NR',
            'Pacific/Tarawa': 'KI',
            'Pacific/Rarotonga': 'CK',
            'Africa/Gaborone': 'BW',
            'Africa/Mbabane': 'SZ',
            'Africa/Maseru': 'LS',
            'Africa/Windhoek': 'NA',
            'Africa/Harare': 'ZW',
            'Africa/Maputo': 'MZ',
            'Africa/Luanda': 'AO',
            'Africa/Lusaka': 'ZM',
            'Africa/Blantyre': 'MW',
            'Africa/Dar_es_Salaam': 'TZ',
            'Africa/Kampala': 'UG',
            'Africa/Kigali': 'RW',
            'Africa/Bujumbura': 'BI',
            'Africa/Addis_Ababa': 'ET',
            'Africa/Asmara': 'ER',
            'Africa/Djibouti': 'DJ',
            'Africa/Mogadishu': 'SO',
            'Indian/Mahe': 'SC',
            'Indian/Mauritius': 'MU',
            'Indian/Comoro': 'KM',
            'Indian/Antananarivo': 'MG',
            'Africa/Bangui': 'CF',
            'Africa/Ndjamena': 'TD',
            'Africa/Douala': 'CM',
            'Africa/Libreville': 'GA',
            'Africa/Malabo': 'GQ',
            'Africa/Brazzaville': 'CG',
            'Africa/Ouagadougou': 'BF',
            'Africa/Porto-Novo': 'BJ',
            'Africa/Abidjan': 'CI',
            'Africa/Bissau': 'GW',
            'Africa/Bamako': 'ML',
            'Africa/Niamey': 'NE',
            'Africa/Dakar': 'SN',
            'Africa/Lome': 'TG',
            'Africa/Banjul': 'GM',
            'Africa/Conakry': 'GN',
            'Africa/Freetown': 'SL',
            'Africa/Monrovia': 'LR',
            'Atlantic/Cape_Verde': 'CV',
            'Africa/Sao_Tome': 'ST',
            'Africa/Kinshasa': 'CD',
            'Africa/Khartoum': 'SD',
            'Africa/Juba': 'SS',
            'Africa/Tripoli': 'LY',
            'Asia/Kabul': 'AF',
            'Asia/Karachi': 'PK',
            'Asia/Dhaka': 'BD',
            'Asia/Colombo': 'LK',
            'Indian/Maldives': 'MV',
            'Asia/Kathmandu': 'NP',
            'Asia/Thimphu': 'BT',
            'Asia/Yangon': 'MM',
            'Asia/Phnom_Penh': 'KH',
            'Asia/Vientiane': 'LA',
            'Asia/Brunei': 'BN',
            'Asia/Ulaanbaatar': 'MN',
            'Asia/Almaty': 'KZ',
            'Asia/Tashkent': 'UZ',
            'Asia/Bishkek': 'KG',
            'Asia/Dushanbe': 'TJ',
            'Asia/Ashgabat': 'TM',
            'Asia/Tbilisi': 'GE',
            'Asia/Yerevan': 'AM',
            'Asia/Baku': 'AZ',
            'Europe/Minsk': 'BY',
            'Europe/Chisinau': 'MD',
            'Europe/Kiev': 'UA'
        };
        
        return timezoneToCountry[timezone];
    }

    async updateExchangeRates() {
        try {
            // Try free API first
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/ZAR');
            const data = await response.json();
            
            if (data.rates) {
                this.currentRates = { ...this.baseRates, ...data.rates };
                this.lastUpdate = new Date();
                console.log('Exchange rates updated successfully');
            }
        } catch (error) {
            console.warn('Failed to update exchange rates, using base rates:', error);
            // Use base rates as fallback
        }
    }

    initializeCurrencySelector() {
        // Create currency selector if it doesn't exist
        if (!document.getElementById('currencySelector')) {
            this.createCurrencySelector();
        }
        
        // Set current currency in selector
        const selector = document.getElementById('currencySelector');
        if (selector) {
            selector.value = this.currentCurrency;
        }
    }

    createCurrencySelector() {
        const selector = document.createElement('select');
        selector.id = 'currencySelector';
        selector.className = 'currency-selector';
        
        // Popular currencies first
        const popularCurrencies = ['ZAR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'JPY', 'CNY', 'INR', 'BRL', 'MXN', 'NGN', 'KES', 'GHS', 'EGP'];
        
        // Add popular currencies
        popularCurrencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = `${this.currencySymbols[currency]} ${currency}`;
            selector.appendChild(option);
        });
        
        // Add separator
        const separator = document.createElement('option');
        separator.disabled = true;
        separator.textContent = '──────────';
        selector.appendChild(separator);
        
        // Add all other currencies
        Object.keys(this.currencySymbols).forEach(currency => {
            if (!popularCurrencies.includes(currency)) {
                const option = document.createElement('option');
                option.value = currency;
                option.textContent = `${this.currencySymbols[currency]} ${currency}`;
                selector.appendChild(option);
            }
        });
        
        // Add event listener
        selector.addEventListener('change', (e) => {
            this.changeCurrency(e.target.value);
        });
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .currency-selector {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                background: rgba(26, 26, 26, 0.9);
                border: 1px solid #00D4FF;
                border-radius: 8px;
                padding: 8px 12px;
                color: #E5E5E5;
                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .currency-selector:hover {
                background: rgba(26, 26, 26, 1);
                box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
            }
            
            .currency-selector option {
                background: #1A1A1A;
                color: #E5E5E5;
                padding: 4px 8px;
            }
            
            .currency-selector option:disabled {
                color: #666;
            }
            
            @media (max-width: 768px) {
                .currency-selector {
                    position: relative;
                    top: auto;
                    right: auto;
                    margin: 10px;
                    width: calc(100% - 20px);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add to page
        document.body.appendChild(selector);
    }

    changeCurrency(newCurrency) {
        if (this.currentRates[newCurrency]) {
            this.currentCurrency = newCurrency;
            this.storeCurrency(newCurrency);
            this.convertAllPrices();
            
            // Show notification
            this.showNotification(`Currency changed to ${this.currencySymbols[newCurrency]} ${newCurrency}`);
        }
    }

    convertAllPrices() {
        // Find all price elements and convert them
        const priceElements = document.querySelectorAll('[data-price], .price, [class*="price"]');
        
        priceElements.forEach(element => {
            this.convertPriceElement(element);
        });
        
        // Also search for text content with "R" followed by numbers
        this.convertTextPrices();
    }

    convertTextPrices() {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        
        while (node = walker.nextNode()) {
            if (node.nodeValue.match(/R\s*[\d,]+/)) {
                textNodes.push(node);
            }
        }
        
        textNodes.forEach(textNode => {
            if (textNode.parentNode.tagName !== 'SCRIPT' && textNode.parentNode.tagName !== 'STYLE') {
                textNode.nodeValue = textNode.nodeValue.replace(/R\s*([\d,]+)/g, (match, amount) => {
                    const numericAmount = parseFloat(amount.replace(/,/g, ''));
                    const convertedAmount = this.convertPrice(numericAmount);
                    return this.formatPrice(convertedAmount);
                });
            }
        });
    }

    convertPriceElement(element) {
        const originalPrice = element.getAttribute('data-original-price');
        
        if (!originalPrice) {
            // Store original price
            const priceText = element.textContent.replace(/[^\d,]/g, '');
            element.setAttribute('data-original-price', priceText);
        }
        
        const priceAmount = parseFloat((originalPrice || element.textContent.replace(/[^\d,]/g, '')).replace(/,/g, ''));
        
        if (!isNaN(priceAmount)) {
            const convertedAmount = this.convertPrice(priceAmount);
            element.textContent = this.formatPrice(convertedAmount);
        }
    }

    convertPrice(zarAmount) {
        if (this.currentCurrency === 'ZAR') {
            return zarAmount;
        }
        
        const rate = this.currentRates[this.currentCurrency];
        return zarAmount * rate;
    }

    formatPrice(amount) {
        const symbol = this.currencySymbols[this.currentCurrency];
        
        if (amount >= 1000000) {
            return `${symbol}${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
            return `${symbol}${(amount / 1000).toFixed(1)}K`;
        } else if (amount >= 1) {
            return `${symbol}${amount.toFixed(0)}`;
        } else {
            return `${symbol}${amount.toFixed(2)}`;
        }
    }

    storeCurrency(currency) {
        localStorage.setItem('preferredCurrency', currency);
    }

    getStoredCurrency() {
        return localStorage.getItem('preferredCurrency');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'currency-notification';
        notification.textContent = message;
        
        const style = document.createElement('style');
        style.textContent = `
            .currency-notification {
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 1001;
                background: #00D4FF;
                color: #0A0A0A;
                padding: 12px 16px;
                border-radius: 8px;
                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                font-weight: 600;
                box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
                animation: slideIn 0.3s ease-out;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Public methods for manual control
    getCurrency() {
        return this.currentCurrency;
    }

    setCurrency(currency) {
        this.changeCurrency(currency);
    }

    getAvailableCurrencies() {
        return Object.keys(this.currencySymbols);
    }

    getExchangeRate(currency) {
        return this.currentRates[currency];
    }

    // Update rates manually
    async refreshRates() {
        await this.updateExchangeRates();
        this.convertAllPrices();
        this.showNotification('Exchange rates updated');
    }
}

// Initialize currency converter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.currencyConverter = new CurrencyConverter();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CurrencyConverter;
}