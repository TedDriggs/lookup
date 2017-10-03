declare module "ipaddr.js" {
    interface IPAddress {
        /**
         * The type of the represented IP address. Use this instead of
         * `instanceof`.
         */
        kind(): "ipv4" | "ipv6";

        toString(): string;

        match(other: CIDR<IPAddress>): boolean;

        match(other: IPAddress, prefixLength: number): boolean;

        toByteArray(): ByteArray;
    }

    type ByteArray = IPv4ByteArray | IPv6ByteArray;

    type IPv4ByteArray = [number, number, number, number];

    type IPv6ByteArray = [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];

    /**
     * A CIDR block expressed as an array of `[address, prefixLength]`.
     */
    type CIDR<T extends IPAddress> = [T, number];

    /**
     * An IPv4 address.
     */
    class IPv4 implements IPAddress {
        kind(): "ipv4";

        toString(): string;

        match(other: CIDR<IPAddress>): boolean;

        match(other: IPAddress, prefixLength: number): boolean;

        readonly octects: IPv4ByteArray;

        toByteArray(): IPv4ByteArray;
    }

    /**
     * An IPv6 address.
     */
    class IPv6 implements IPAddress {
        kind(): "ipv6";

        toString(): string;

        match(other: CIDR<IPAddress>): boolean;

        match(other: IPAddress, prefixLength: number): boolean;

        toNormalizedString(): string;

        isIPv4MappedAddress(): boolean;

        toIPv4Address(): IPv4 | null;

        toByteArray(): IPv6ByteArray;
    }

    /**
     * Returns true if the provided string represents a valid IPv4 or IPv6 address.
     */
    function isValid(addr: string): boolean;

    /**
     * Parses a string and returns the corresponding IP implementation, or
     * throws an Error if the passed string is not a valid representation
     * of an IP address.
     */
    function parse(addr: string): IPAddress;

    function parseCIDR(cidr: string): CIDR<IPAddress>;

    function process(addr: string): IPAddress;

    function fromByteArray(bytes: IPv4ByteArray): IPv4;
    
    function fromByteArray(bytes: IPv6ByteArray): IPv6;
}