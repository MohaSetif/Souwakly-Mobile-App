import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, GoldColors } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={styles.heroLine} />
          <ThemedText style={styles.heroLabel}>MEMBER SINCE {new Date().getFullYear()}</ThemedText>
          <ThemedText style={styles.heroName}>{user?.name?.toUpperCase() || 'EXECUTIVE'}</ThemedText>
          <View style={styles.heroSubRow}>
            <ThemedText style={styles.heroStatus}>VERIFIED PARTNER</ThemedText>
            <HelloWave />
          </View>
        </View>

        <View style={styles.mainGrid}>
          <View style={styles.statsPanel}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>NET WORTH</ThemedText>
              <ThemedText style={styles.statValue}>$1.2M</ThemedText>
              <View style={styles.trendRow}>
                <IconSymbol name="arrow.up.right" size={12} color="#4ade80" />
                <ThemedText style={styles.trendText}>+12.5%</ThemedText>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>NETWORK</ThemedText>
              <ThemedText style={styles.statValue}>48 k</ThemedText>
              <ThemedText style={styles.trendText}>ACTIVE NODES</ThemedText>
            </View>
          </View>

          <View style={styles.featuredCard}>
            <View style={styles.featuredContent}>
              <ThemedText style={styles.featuredTag}>PRIORITY</ThemedText>
              <ThemedText style={styles.featuredTitle}>Expand Global Reach</ThemedText>
              <ThemedText style={styles.featuredDesc}>Invite 10 new strategic partners to unlock the Platinum tier.</ThemedText>
            </View>
            <TouchableOpacity style={styles.featuredAction}>
              <IconSymbol name="arrow.right" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.actionsList}>
            <ThemedText style={styles.sectionLabel}>CAPABILITIES</ThemedText>
            <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
              <View style={styles.actionIcon}>
                <IconSymbol name="plus" size={20} color={GoldColors.primary} />
              </View>
              <ThemedText style={styles.actionLabel}>DEPLOY NEW ASSET</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
              <View style={styles.actionIcon}>
                <IconSymbol name="link" size={20} color={GoldColors.primary} />
              </View>
              <ThemedText style={styles.actionLabel}>GENERATE ACCESS LINK</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutLink}
          onPress={handleLogout}
          disabled={isLoggingOut}
          activeOpacity={0.7}
        >
          <ThemedText style={styles.logoutText}>TERMINATE SESSION</ThemedText>
          {isLoggingOut && <ActivityIndicator size="small" color="#ff6b6b" style={{ marginLeft: 10 }} />}
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 120,
    paddingHorizontal: 30,
  },
  heroSection: {
    marginBottom: 60,
  },
  heroLine: {
    width: 2,
    height: 40,
    backgroundColor: GoldColors.primary,
    marginBottom: 20,
  },
  heroLabel: {
    fontSize: 10,
    letterSpacing: 3,
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: '700',
    marginBottom: 10,
  },
  heroName: {
    fontSize: 48,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -1,
    lineHeight: 52,
  },
  heroSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    gap: 15,
  },
  heroStatus: {
    fontSize: 12,
    color: GoldColors.primary,
    letterSpacing: 2,
    fontWeight: '800',
  },
  mainGrid: {
    gap: 40,
  },
  statsPanel: {
    flexDirection: 'row',
    backgroundColor: '#0A0A0A',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.05)',
    padding: 30,
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    gap: 8,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 20,
  },
  statLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: 'rgba(255, 255, 255, 0.3)',
    fontWeight: '800',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '300',
    color: GoldColors.primary,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: '600',
  },
  featuredCard: {
    backgroundColor: GoldColors.secondary,
    padding: 30,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    shadowColor: GoldColors.secondary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  featuredContent: {
    flex: 1,
    gap: 12,
  },
  featuredTag: {
    fontSize: 9,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 2,
    opacity: 0.6,
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
  },
  featuredDesc: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.6)',
    lineHeight: 18,
  },
  featuredAction: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsList: {
    gap: 20,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 3,
    color: 'rgba(255, 255, 255, 0.2)',
    fontWeight: '800',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 15,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },
  logoutLink: {
    marginTop: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 11,
    letterSpacing: 2,
    color: '#ff6b6b',
    fontWeight: '800',
  },
});
