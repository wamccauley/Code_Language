## The Boot Process

The boot process is the sequence of events that occurs when a computer is powered on and the operating system is loaded into memory. Here’s an overview of the stages in the boot process:

1. **BIOS/UEFI Initialization**:

   - The Basic Input/Output System (BIOS) or Unified Extensible Firmware Interface (UEFI) initializes hardware components and performs a Power-On Self Test (POST) to ensure everything is functioning correctly.
   - BIOS/UEFI locates and executes the bootloader from the bootable device (e.g., HDD, SSD).

2. **Bootloader Execution**:

   - The bootloader is a small program that loads the operating system kernel into memory.
   - Common bootloaders include GRUB (GRand Unified Bootloader) and LILO (Linux Loader).

3. **Kernel Loading**:

   - The bootloader loads the kernel and initial RAM disk (initrd or initramfs) into memory.
   - The kernel initializes hardware components, mounts the root file system, and starts the initial process (`init` or `systemd`).

4. **System Initialization**:
   - The `init` process or `systemd` initializes user-space services and sets up the user environment.
   - The system reaches a state where users can log in and interact with the OS.

## The Bootloader

### What is a Bootloader?

A bootloader is a program that loads the operating system kernel into memory and starts its execution. It also allows users to select from multiple operating systems installed on the system.

### Common Bootloaders:

- **GRUB (GRand Unified Bootloader)**: The most widely used bootloader for Linux systems, supporting a wide range of file systems and configurations.
- **LILO (Linux Loader)**: An older bootloader that has largely been replaced by GRUB.
- **Syslinux/EXTlinux**: Lightweight bootloaders often used for live USBs and embedded systems.

### Bootloader Stages:

1. **Stage 1**: Located in the Master Boot Record (MBR) or the GUID Partition Table (GPT). It loads the Stage 1.5 or Stage 2 bootloader.
2. **Stage 1.5**: Optional intermediate stage that understands file systems, allowing the Stage 2 bootloader to be located and loaded.
3. **Stage 2**: The main bootloader that presents the user with a menu to select the operating system and loads the selected OS kernel.
