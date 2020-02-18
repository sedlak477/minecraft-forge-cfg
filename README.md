
[![npm](https://img.shields.io/npm/v/minecraft-forge-cfg)](https://www.npmjs.com/package/minecraft-forge-cfg)
![License](https://img.shields.io/npm/l/minecraft-forge-cfg)

# Minecraft Forge cfg parser

This package parses `.cfg` files produced by [Minecraft Forge](https://files.minecraftforge.net/).

> Note: It may contain bugs, it has not been tested thoroughly. It works for most configs but it is not clear if it works for all. If you encounter any problems [open a issue](https://github.com/sedlak477/minecraft-forge-cfg/issues) and we'll try to figure things out.

## Usage

There is only one function `parse(str): data`. It takes the contents of the `cfg` file as a string and returns an object with the parsed data:

Example:

```javascript
const parser = require("minecraft-forge-cfg");

let file = `
accelerator {
    # RF/s required to keep a superconducting electromagnet active.
    I:accelerator_electromagnet_power=20000

    # mB/s of liquid helium required to keep a superconducting supercooler active.
    I:accelerator_supercooler_coolant=4
}

energy_storage {
    # Maximum RF storable. Order: Voltaic Pile [Basic, Advanced, DU, Elite], Lithium Ion Battery [Basic, Advanced, DU, Elite].
    I:battery_capacity <
        1600000
        6400000
        25600000
        102400000
        32000000
        128000000
        512000000
        2048000000
     >
}
`;

let data = parser.parse(file);

console.log(data);
```

Outputs:
```
{
  accelerator: {
    accelerator_electromagnet_power: 20000,
    accelerator_supercooler_coolant: 4
  },
  energy_storage: {
    battery_capacity: [
        1600000,    6400000,
       25600000,  102400000,
       32000000,  128000000,
      512000000, 2048000000
    ]
  }
}
```

## Contribution
If you have ideas or find a bug, [**open a issue**](https://github.com/sedlak477/minecraft-forge-cfg/issues) on GitHub to discuss the changes and I'll merge your PR if everything is in order.

## License

This project is licensed under the **MIT license**.
