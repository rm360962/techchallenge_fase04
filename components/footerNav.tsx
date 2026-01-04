import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, Icon, useTheme } from 'react-native-paper';
import { useRouter, usePathname } from 'expo-router';

const FooterNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  if (pathname === '/login' || pathname === '/') return null;

  const NavItem = ({ icon, label, route }: { icon: string, label: string, route: string }) => {
    const ativo = pathname.includes(route);
    const color = ativo ? theme.colors.primary : theme.colors.outline;

    return (
      <TouchableRipple
        onPress={() => router.push(route)}
        style={styles.navItem}
        rippleColor="rgba(0, 0, 0, .1)"
      >
        <View style={styles.centered}>
          <Icon source={icon} size={24} color={color} />
          <Text style={{ color, fontSize: 12 }}>{label}</Text>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <View style={styles.footer}>
      <NavItem icon="post" label="Postagens" route="/postagem" />
      <NavItem icon="account-group" label="Usuários" route="/usuario" />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    alignItems: 'center',
  }
});

export default FooterNav;