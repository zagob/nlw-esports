import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Background } from "../../components/Background";

import { styles } from "./styles";
import { GameParams } from "../../@types/navigation";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { THEME } from "../../theme";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");

  const route = useRoute();
  const navigation = useNavigation();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://172.26.0.1:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((response) => setDiscordDuoSelected(response.discord));
  }

  useEffect(() => {
    fetch(`http://172.26.0.1:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((response) => setDuos(response));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(duo) => duo.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          horizontal
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          style={styles.containerList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anuncios publicados.
            </Text>
          )}
        />

        <DuoMatch
          onClose={() => setDiscordDuoSelected("")}
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
        />
      </SafeAreaView>
    </Background>
  );
}
