## GRUB (GRand Unified Bootloader)

### What is GRUB?

GRUB is the default bootloader for many Linux distributions. It is highly configurable and supports multiple operating systems, file systems, and advanced features like scripting and network booting.

### GRUB Versions:

- **GRUB Legacy**: The original version, now largely replaced by GRUB 2.
- **GRUB 2**: The current version with improved features, modular design, and better support for modern hardware.

### GRUB Configuration:

- **Configuration File**: `/boot/grub/grub.cfg`
- **Default File**: `/etc/default/grub` (used to generate `grub.cfg`)

### Key GRUB Commands:

- **Update GRUB Configuration**:
  ```sh
  sudo update-grub   # Debian-based systems
  sudo grub-mkconfig -o /boot/grub/grub.cfg  # Other systems
  ```
- **Install GRUB**:
  ```sh
  sudo grub-install /dev/sdX  # Replace X with the appropriate drive letter
  ```

### GRUB Configuration Example:

```sh
# /etc/default/grub
GRUB_DEFAULT=0
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
GRUB_CMDLINE_LINUX=""

# /boot/grub/grub.cfg (generated)
menuentry 'Ubuntu' --class ubuntu --class gnu-linux --class gnu --class os {
    recordfail
    load_video
    gfxmode $linux_gfx_mode
    insmod gzio
    insmod part_msdos
    insmod ext2
    set root='hd0,msdos1'
    linux /boot/vmlinuz-5.4.0-42-generic root=UUID=xxxx ro quiet splash
    initrd /boot/initrd.img-5.4.0-42-generic
}
```

## Advanced Bootloader Concepts

### Chainloading:

Chainloading allows one bootloader to load another bootloader. This is useful for systems with multiple operating systems that each have their own bootloaders.

```sh
menuentry "Chainload Another GRUB" {
    set root=(hd0,1)
    chainloader +1
}
```

### Rescue Mode:

If GRUB fails to boot, it enters rescue mode, allowing users to manually boot the system or repair the bootloader.

- **Example Commands**:
  ```sh
  set root=(hd0,1)
  linux /boot/vmlinuz root=/dev/sda1
  initrd /boot/initrd.img
  boot
  ```
