import React, { useState } from 'react';
import { Copy, Check, Download, Code2, Smartphone, FileCode } from 'lucide-react';

const AndroidIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993s-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993s-.4482.9997-.9993.9997m11.4045-6.02l1.997-3.459a.416.416 0 0 0-.1523-.5676.416.416 0 0 0-.5676.1523l-2.0223 3.503C15.5835 8.4116 13.8523 8.125 12 8.125c-1.8523 0-3.5835.2866-5.1373.8251L4.8404 5.4471a.4163.4163 0 0 0-.5676-.1523.416.416 0 0 0-.1523.5676l1.997 3.459C2.6885 11.1767 0 14.7735 0 19h24c0-4.2265-2.6885-7.8233-6.1185-9.6786" />
  </svg>
);

const KOTLIN_MAIN_ACTIVITY = `package com.racha.app

import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.ElectricBolt
import androidx.compose.material.icons.filled.LocalFireDepartment
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit
import java.util.Locale

// -------------------------------------------------------------
// COLORES NEÓN PARA TEMA OSCURO
// -------------------------------------------------------------
val NeonBackground = Color(0xFF07080B)
val NeonCardSurface = Color(0xFF10121A)
val NeonCardBorder = Color(0xFF1D2230)
val NeonGreen = Color(0xFF00FF66)
val NeonOrange = Color(0xFFFF5500)
val NeonCyan = Color(0xFF00F0FF)
val NeonAmber = Color(0xFFFFB800)
val TextMuted = Color(0xFF8E95A5)

// -------------------------------------------------------------
// FRASES MOTIVADORAS (100% OFFLINE)
// -------------------------------------------------------------
val MotivationalQuotes = listOf(
    "La disciplina tarde o temprano vencerá a la inteligencia." to "Proverbio Japonés",
    "No cuentes los días, haz que los días cuenten." to "Muhammad Ali",
    "Somos lo que hacemos día a día. La excelencia es un hábito." to "Aristóteles",
    "Un pequeño avance cada día suma grandes resultados." to "James Clear",
    "El dolor de la disciplina pesa gramos; el arrepentimiento, toneladas." to "Jim Rohn",
    "El estudio es la oportunidad para penetrar en el bello mundo del saber." to "Albert Einstein",
    "La suerte favorece a la mente preparada." to "Louis Pasteur",
    "No temas avanzar despacio; teme únicamente quedarte quieto." to "Proverbio Chino",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día." to "Robert Collier",
    "Cada página que lees hoy construye tu libertad de mañana." to "RACHA",
    "Si te cansas, aprende a descansar, no a renunciar." to "Banksy",
    "Un día o el día uno. Tú decides." to "Paulo Coelho",
    "Mantener la racha no es suerte, es una decisión diaria." to "RACHA"
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            RachaTheme {
                RachaScreen()
            }
        }
    }
}

@Composable
fun RachaTheme(content: @Composable () -> Unit) {
    val colorScheme = darkColorScheme(
        background = NeonBackground,
        surface = NeonCardSurface,
        primary = NeonGreen,
        secondary = NeonCyan,
        tertiary = NeonOrange
    )
    MaterialTheme(colorScheme = colorScheme, content = content)
}

@Composable
fun RachaScreen() {
    val context = LocalContext.current
    val haptic = LocalHapticFeedback.current
    val prefs = remember { context.getSharedPreferences("racha_prefs", Context.MODE_PRIVATE) }

    // Fechas completadas guardadas en el teléfono (formato YYYY-MM-DD)
    var completedDates by remember {
        val savedSet = prefs.getStringSet("completed_dates", emptySet()) ?: emptySet()
        mutableStateOf(savedSet)
    }

    var quoteIndex by remember {
        mutableStateOf((MotivationalQuotes.indices).random())
    }

    val today = remember { LocalDate.now() }
    val todayStr = remember(today) { today.toString() }
    val isStudiedToday = completedDates.contains(todayStr)

    // Cálculo de racha consecutiva
    val currentStreak = remember(completedDates, today) {
        calculateStreak(completedDates, today)
    }

    // Guardar cambios en SharedPreferences
    fun persistDates(newSet: Set<String>) {
        completedDates = newSet
        prefs.edit().putStringSet("completed_dates", newSet).apply()
    }

    fun onStudyToday() {
        haptic.performHapticFeedback(HapticFeedbackType.LongPress)
        val newSet = completedDates + todayStr
        persistDates(newSet)
        quoteIndex = (MotivationalQuotes.indices).random()
    }

    fun onUndoToday() {
        haptic.performHapticFeedback(HapticFeedbackType.TextHandleMove)
        val newSet = completedDates - todayStr
        persistDates(newSet)
    }

    fun onTogglePastDay(dateStr: String) {
        haptic.performHapticFeedback(HapticFeedbackType.TextHandleMove)
        val newSet = if (completedDates.contains(dateStr)) {
            completedDates - dateStr
        } else {
            completedDates + dateStr
        }
        persistDates(newSet)
    }

    Surface(
        modifier = Modifier.fillMaxSize(),
        color = NeonBackground
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .statusBarsPadding()
                .navigationBarsPadding()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 24.dp, vertical = 16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // ENCABEZADO
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "RACHA",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Black,
                    letterSpacing = 4.sp,
                    color = Color.White
                )
                Text(
                    text = "OFFLINE · SIN ANUNCIOS",
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    color = NeonGreen,
                    letterSpacing = 1.sp
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            // CONTADOR GRANDE DE DÍAS CONSECUTIVOS
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.fillMaxWidth()
            ) {
                // Ícono de llama neón
                Box(
                    modifier = Modifier
                        .size(68.dp)
                        .clip(RoundedCornerShape(20.dp))
                        .background(
                            if (currentStreak > 0) NeonOrange.copy(alpha = 0.2f)
                            else NeonCardSurface
                        )
                        .border(
                            1.dp,
                            if (currentStreak > 0) NeonOrange else NeonCardBorder,
                            RoundedCornerShape(20.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.LocalFireDepartment,
                        contentDescription = "Fuego de racha",
                        tint = if (currentStreak > 0) NeonOrange else TextMuted,
                        modifier = Modifier.size(40.dp)
                    )
                }

                Spacer(modifier = Modifier.height(8.dp))

                // Número gigante
                Text(
                    text = "$currentStreak",
                    fontSize = 96.sp,
                    fontWeight = FontWeight.Black,
                    fontFamily = FontFamily.Monospace,
                    color = if (isStudiedToday) NeonGreen else if (currentStreak > 0) NeonOrange else TextMuted,
                    lineHeight = 96.sp
                )

                Text(
                    text = if (currentStreak == 1) "DÍA CONSECUTIVO" else "DÍAS CONSECUTIVOS",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.ExtraBold,
                    letterSpacing = 2.sp,
                    color = Color.White.copy(alpha = 0.8f)
                )

                Text(
                    text = if (isStudiedToday) "🔥 Racha activa hoy"
                    else if (currentStreak > 0) "⚡ ¡Estudiá hoy para mantenerla!"
                    else "Comenzá tu racha hoy",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = if (isStudiedToday) NeonGreen else NeonAmber,
                    modifier = Modifier.padding(top = 4.dp)
                )
            }

            Spacer(modifier = Modifier.height(28.dp))

            // BOTÓN «HOY SÍ ESTUDIÉ»
            if (!isStudiedToday) {
                Button(
                    onClick = { onStudyToday() },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = NeonGreen,
                        contentColor = Color.Black
                    ),
                    shape = RoundedCornerShape(18.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(64.dp)
                        .shadow(16.dp, RoundedCornerShape(18.dp), spotColor = NeonGreen)
                ) {
                    Icon(
                        imageVector = Icons.Default.ElectricBolt,
                        contentDescription = null,
                        tint = Color.Black,
                        modifier = Modifier.size(24.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "HOY SÍ ESTUDIÉ",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Black,
                        letterSpacing = 1.sp
                    )
                }
            } else {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(56.dp)
                            .clip(RoundedCornerShape(18.dp))
                            .background(NeonGreen.copy(alpha = 0.15f))
                            .border(2.dp, NeonGreen, RoundedCornerShape(18.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Default.Check,
                                contentDescription = null,
                                tint = NeonGreen,
                                modifier = Modifier.size(22.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "¡HOY SÍ ESTUDIASTE!",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Black,
                                color = NeonGreen
                            )
                        }
                    }

                    TextButton(onClick = { onUndoToday() }) {
                        Text(
                            text = "Deshacer registro de hoy",
                            fontSize = 12.sp,
                            color = TextMuted
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // LISTA DE LOS ÚLTIMOS SIETE DÍAS
            Column(modifier = Modifier.fillMaxWidth()) {
                Text(
                    text = "ÚLTIMOS 7 DÍAS",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.sp,
                    color = TextMuted
                )

                Spacer(modifier = Modifier.height(8.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    val daysList = remember(today) {
                        (6 downTo 0).map { today.minusDays(it.toLong()) }
                    }

                    daysList.forEach { date ->
                        val dateKey = date.toString()
                        val isCompleted = completedDates.contains(dateKey)
                        val isCurrentDay = date == today
                        val dayName = date.dayOfWeek.name.take(3)
                        val dayNumber = date.dayOfMonth.toString()

                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier
                                .weight(1f)
                                .clip(RoundedCornerShape(12.dp))
                                .background(
                                    if (isCurrentDay && isCompleted) NeonGreen.copy(alpha = 0.15f)
                                    else NeonCardSurface
                                )
                                .border(
                                    1.dp,
                                    if (isCurrentDay) NeonGreen else if (isCompleted) NeonGreen.copy(alpha = 0.4f) else NeonCardBorder,
                                    RoundedCornerShape(12.dp)
                                )
                                .clickable { onTogglePastDay(dateKey) }
                                .padding(vertical = 8.dp)
                        ) {
                            Text(
                                text = dayName,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                color = TextMuted
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Box(
                                modifier = Modifier
                                    .size(24.dp)
                                    .clip(CircleShape)
                                    .background(
                                        if (isCompleted) NeonGreen else Color.Transparent
                                    ),
                                contentAlignment = Alignment.Center
                            ) {
                                if (isCompleted) {
                                    Icon(
                                        imageVector = Icons.Default.Check,
                                        contentDescription = null,
                                        tint = Color.Black,
                                        modifier = Modifier.size(16.dp)
                                    )
                                } else {
                                    Text(
                                        text = "-",
                                        fontSize = 12.sp,
                                        color = TextMuted
                                    )
                                }
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = dayNumber,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                color = if (isCompleted) Color.White else TextMuted
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // MENSAJE MOTIVADOR DISTINTO CADA VEZ
            val (quoteText, quoteAuthor) = MotivationalQuotes[quoteIndex]
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(NeonCardSurface)
                    .border(1.dp, NeonCardBorder, RoundedCornerShape(16.dp))
                    .padding(16.dp)
            ) {
                Column {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "MOTIVACIÓN",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = NeonCyan,
                            letterSpacing = 1.sp
                        )
                        IconButton(
                            onClick = {
                                quoteIndex = (MotivationalQuotes.indices).random()
                            },
                            modifier = Modifier.size(24.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Refresh,
                                contentDescription = "Cambiar frase",
                                tint = TextMuted,
                                modifier = Modifier.size(16.dp)
                            )
                        }
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "\\"$quoteText\\"",
                        fontSize = 13.sp,
                        fontStyle = FontStyle.Italic,
                        color = Color.White.copy(alpha = 0.9f),
                        lineHeight = 18.sp
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "— $quoteAuthor",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = TextMuted,
                        textAlign = TextAlign.End,
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            }
        }
    }
}

// -------------------------------------------------------------
// LÓGICA DE DÍAS CONSECUTIVOS
// -------------------------------------------------------------
fun calculateStreak(completedDates: Set<String>, today: LocalDate): Int {
    val todayStr = today.toString()
    val yesterdayStr = today.minusDays(1).toString()
    val isStudiedToday = completedDates.contains(todayStr)
    val studiedYesterday = completedDates.contains(yesterdayStr)

    if (!isStudiedToday && !studiedYesterday) return 0

    var streak = 0
    var checkDate = if (isStudiedToday) today else today.minusDays(1)

    while (completedDates.contains(checkDate.toString())) {
        streak++
        checkDate = checkDate.minusDays(1)
    }
    return streak
}
`;

const GRADLE_KTS = `// build.gradle.kts (Module: app)
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.racha.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.racha.app"
        minSdk = 26 // Para java.time.LocalDate nativo
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.material.icons.extended)
}
`;

const ANDROID_MANIFEST = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- CERO permisos de internet para garantizar privacidad y 100% offline -->
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="RACHA"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@android:style/Theme.Material.NoActionBar">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@android:style/Theme.Material.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
`;

export const AndroidKotlinSource: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'main' | 'gradle' | 'manifest'>('main');
  const [copied, setCopied] = useState(false);

  const getActiveCode = () => {
    switch (activeTab) {
      case 'main':
        return KOTLIN_MAIN_ACTIVITY;
      case 'gradle':
        return GRADLE_KTS;
      case 'manifest':
        return ANDROID_MANIFEST;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeTab === 'main' ? 'MainActivity.kt' : activeTab === 'gradle' ? 'build.gradle.kts' : 'AndroidManifest.xml';
    const blob = new Blob([getActiveCode()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 text-slate-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <AndroidIcon className="w-5 h-5 text-[#00FF66]" />
            <h2 className="text-lg font-bold text-white">Código Android en Kotlin (Jetpack Compose)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Proyecto listo para Android Studio. Modo oscuro neón, SharedPreferences para persistencia local y 0 conexión a internet.
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00FF66]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado' : 'Copiar código'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00FF66] hover:bg-[#33ff85] text-xs font-bold text-black transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={() => setActiveTab('main')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'main'
              ? 'bg-slate-800 text-[#00FF66] border border-[#00FF66]/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>MainActivity.kt</span>
        </button>

        <button
          onClick={() => setActiveTab('gradle')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'gradle'
              ? 'bg-slate-800 text-[#00FF66] border border-[#00FF66]/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>build.gradle.kts</span>
        </button>

        <button
          onClick={() => setActiveTab('manifest')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'manifest'
              ? 'bg-slate-800 text-[#00FF66] border border-[#00FF66]/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>AndroidManifest.xml</span>
        </button>
      </div>

      {/* Code Display */}
      <div className="mt-3 relative rounded-xl bg-[#030406] border border-slate-800 overflow-hidden">
        <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto max-h-[520px] leading-relaxed selection:bg-[#00FF66] selection:text-black">
          <code>{getActiveCode()}</code>
        </pre>
      </div>

      {/* Quick steps */}
      <div className="mt-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
        <p className="font-bold text-white mb-1">💡 Pasos para compilar en Android Studio:</p>
        <ol className="list-decimal list-inside space-y-0.5 text-slate-400">
          <li>Creá un proyecto nuevo con la plantilla <strong>Empty Activity (Compose)</strong>.</li>
          <li>Reemplazá el contenido de <code className="text-[#00F0FF]">MainActivity.kt</code> con este código.</li>
          <li>Conectá tu teléfono Android o abrí el emulador y hacé clic en <strong>Run (▶)</strong>.</li>
          <li>¡Listo! Tu app RACHA funciona de forma 100% nativa, sin anuncios y sin internet.</li>
        </ol>
      </div>
    </div>
  );
};
